/**
 * EOS Course Project API
 * Web API for EOS Course project
 *
 * The version of the OpenAPI document: v1
 * Contact: 237294@via.dk
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { GetAllSensorDataResponse } from '../model/getAllSensorDataResponse';
import { RotateServoBody } from '../model/rotateServoBody';
import { SetHeaterStatusBody } from '../model/setHeaterStatusBody';
import { SetLightIntensityBody } from '../model/setLightIntensityBody';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class MainService {

    protected basePath = 'https://localhost:3000';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }



    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiGetAllSensorDataGet(observe?: 'body', reportProgress?: boolean): Observable<GetAllSensorDataResponse>;
    public apiGetAllSensorDataGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GetAllSensorDataResponse>>;
    public apiGetAllSensorDataGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GetAllSensorDataResponse>>;
    public apiGetAllSensorDataGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        return this.httpClient.get<GetAllSensorDataResponse>(`${this.configuration.basePath}/api/getAllSensorData`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param rotateServoBody 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiRotateServoPost(rotateServoBody?: RotateServoBody, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiRotateServoPost(rotateServoBody?: RotateServoBody, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiRotateServoPost(rotateServoBody?: RotateServoBody, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiRotateServoPost(rotateServoBody?: RotateServoBody, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.configuration.basePath}/api/rotateServo`,
            rotateServoBody,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param setHeaterStatusBody 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiSetHeaterStatusPost(setHeaterStatusBody?: SetHeaterStatusBody, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiSetHeaterStatusPost(setHeaterStatusBody?: SetHeaterStatusBody, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiSetHeaterStatusPost(setHeaterStatusBody?: SetHeaterStatusBody, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiSetHeaterStatusPost(setHeaterStatusBody?: SetHeaterStatusBody, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.configuration.basePath}/api/setHeaterStatus`,
            setHeaterStatusBody,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param setLightIntensityBody 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiSetLightIntensityPost(setLightIntensityBody?: SetLightIntensityBody, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public apiSetLightIntensityPost(setLightIntensityBody?: SetLightIntensityBody, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public apiSetLightIntensityPost(setLightIntensityBody?: SetLightIntensityBody, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public apiSetLightIntensityPost(setLightIntensityBody?: SetLightIntensityBody, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.configuration.basePath}/api/setLightIntensity`,
            setLightIntensityBody,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
