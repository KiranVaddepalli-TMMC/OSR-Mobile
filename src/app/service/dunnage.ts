import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable()
export class Dunnage {

    constructor(  http: HttpClient) { }

    getDunnageDetails(key) {
    }
}
