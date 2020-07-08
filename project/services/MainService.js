/**
 * @file Service for all sensor data and functions in the project.
 * @author David V. Nielsen <237294@via.dk>
 * Date: 25-11-2019
 */
/* eslint-disable no-unused-vars */
const Service = require('./Service');
const Servo = require('../devices/servo');
const PwmLight = require('../devices/pwmLight');
const Hih8120 = require('../devices/HIH8120');
const Ldr = require('../devices/ldr');
const Heater = require('../devices/heater');

class MainService {

  /**
   * API Call service handler that fetches data from all the sensors and returns it to the calling client
   * @returns getAllSensorDataResponse
   **/
  static apiGetAllSensorDataGET() {
    return new Promise(
      async (resolve) => {
        try {
          const tempHumidity = await Hih8120.getHumidityTemperature();
          resolve(Service.successResponse(
            {
              "servoPositionFriendly": Servo.getPositionFriendly(),
              "pwmLightIntensity": PwmLight.getLightIntensity(),
              "humidity": tempHumidity.humidity,
              "temperature": tempHumidity.temp,
              "lightIntensity": await Ldr.getLightIntensity(),
              "heaterStatus": Heater.getHeaterStatus()
            }
          ));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * POST state of the window position
   * rotateServoBody RotateServoBody  (optional)
   * No response value expected for this operation
   **/
  static apiRotateServoPOST(rotateServoBody) {
    return new Promise(
      async (resolve) => {
        try {
          Servo.rotateServo(rotateServoBody.body.servoPositionFriendly);
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * POST state of the heater status
   * setHeaterStatusBody SetHeaterStatusBody  (optional)
   * No response value expected for this operation
   **/
  static apiSetHeaterStatusPOST(setHeaterStatusBody) {
    return new Promise(
      async (resolve) => {
        try {
          Heater.setHeater(setHeaterStatusBody.body.heaterStatus);
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

  /**
   * POST light intensity for the PWM light
   * setLightIntensityBody SetLightIntensityBody  (optional)
   * No response value expected for this operation
   **/
  static apiSetLightIntensityPOST(setLightIntensityBody) {
    return new Promise(
      async (resolve) => {
        try {
          const intensity = parseFloat(setLightIntensityBody.body.pwmLightIntensity);
          PwmLight.setLightIntensity(intensity);
          resolve(Service.successResponse(''));
        } catch (e) {
          resolve(Service.rejectResponse(
            e.message || 'Invalid input',
            e.status || 405,
          ));
        }
      },
    );
  }

}

module.exports = MainService;
