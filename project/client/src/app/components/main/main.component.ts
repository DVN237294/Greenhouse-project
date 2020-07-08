/**
 * @file Code-behind/model for the main component.
 * @author David V. Nielsen <237294@via.dk>
 * Date: 25-11-2019
 */
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MainService } from 'api/api';
import { Observable, fromEvent, interval, Subscription } from 'rxjs';
import { GetAllSensorDataResponse } from 'model/getAllSensorDataResponse';
import { RotateServoBody, SetHeaterStatusBody } from 'model/models';
import { switchMap, tap, filter, debounceTime, take } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  pwmProgressBacking = 0;
  refreshProgress = 100;
  timeToRefresh = 0;
  refreshInterval = 10;
  mouseOverControls = false;
  autoRefresherSubscription: Subscription;
  sensorData$: Observable<GetAllSensorDataResponse>;
  constructor(private api: MainService, private lightControl: ElementRef) { }

  get pwmProgress(): number {
    return this.pwmProgressBacking;
  }
  set pwmProgress(value: number) {
    // To ensure the user doesn't scroll beyond the progress bar's limit:
    this.pwmProgressBacking = value;
    if (this.pwmProgressBacking > 100) {
      this.pwmProgressBacking = 100;
    }
    if (this.pwmProgressBacking < 0) {
      this.pwmProgressBacking = 0;
    }
  }

  /**
   * Updates the displayed data when the component has been initialized by the framework.
   */
  ngOnInit() {
    this.refreshData();
  }

  /**
   * Refresh the data by calling updating the observable providing sensor data from the api
   */
  refreshData() {
    // I no longer care about the automatic refresh triggering:
    if (this.autoRefresherSubscription) {
      this.autoRefresherSubscription.unsubscribe();
    }

    // Get api data, and tap into the result to get the current pwm light intensity
    this.sensorData$ = this.api.apiGetAllSensorDataGet().pipe(
      tap(e => {
        const num = parseFloat(e.pwmLightIntensity);
        if (num) {
          this.pwmProgressBacking = num * 100;
        }
      })
    );
  }

  /**
   * Called by the view.
   * Initiates an API call to toggle the window state.
   * @param data - The current sensor data
   */
  toggleWindow(data: GetAllSensorDataResponse) {
    const update: RotateServoBody = {};
    if (data.servoPositionFriendly === GetAllSensorDataResponse.ServoPositionFriendlyEnum.Closed) {
      update.servoPositionFriendly = GetAllSensorDataResponse.ServoPositionFriendlyEnum.Open;
    } else {
      update.servoPositionFriendly = GetAllSensorDataResponse.ServoPositionFriendlyEnum.Closed;
    }
    this.api.apiRotateServoPost(update).subscribe(() => this.refreshData());
  }

  /**
   * Called by the view.
   * Initiates an API call to toggle the heater state.
   * @param data - The current sensor data
   */
  toggleHeater(data: GetAllSensorDataResponse) {
    const update: SetHeaterStatusBody = {};
    if (data.heaterStatus === GetAllSensorDataResponse.HeaterStatusEnum.Off) {
      update.heaterStatus = GetAllSensorDataResponse.HeaterStatusEnum.On;
    } else {
      update.heaterStatus = GetAllSensorDataResponse.HeaterStatusEnum.Off;
    }
    this.api.apiSetHeaterStatusPost(update).subscribe(() => this.refreshData());
  }

  /**
   * ViewChild setter called by the framework when the `lightControl` view element is initialized.
   * Subscribes to scroll events on the element, to initiate API calls to set pwm light intensity.
   */
  @ViewChild('lightControl', { static: false })
  set lightControlInit(element) {
    if (element) {
      // Capture mouse wheel events on the pwm light element
      fromEvent<WheelEvent>(element.nativeElement, 'wheel').pipe(
        tap(e => this.pwmProgress += e.deltaY), // Change the progress bar with every event
        debounceTime(250), // Emit only the last event in any given 250ms period
        switchMap(() => {
          return this.api.apiSetLightIntensityPost({ // Call the api for every event that survived the debounceTime
            pwmLightIntensity: this.pwmProgress / 100
          });
        })
      ).subscribe();
    }
  }

  /**
   * ViewChild setter called by the framework when the `refreshProgressBar` view element is initialized.
   * Creates an observable that updates the refresh bar progress one thousand times over the refresh interval.
   */
  @ViewChild('refreshProgressBar', { static: false })
  set refreshProgressInit(element) {
    if (element) {
      const tick = 1000;
      let counter = 0;
      this.refreshProgress = 100;
      this.timeToRefresh = this.refreshInterval;

      // Create an observable that emits 1001 events on an interval and update the refresh bar with each emit.
      this.autoRefresherSubscription = interval(this.refreshInterval).pipe(
        filter(() => !this.mouseOverControls),
        take(tick + 1)).subscribe({
          next: () => {
            this.refreshProgress = (tick - counter++) / 10;
            this.timeToRefresh -= this.refreshInterval / 1000;
          },
          complete: () => this.refreshData() // When the 1001 events have fired, refresh the page.
        });
    }
  }
}
