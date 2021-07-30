import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable()
export class Welcome {

    constructor(  http: HttpClient) { }

    getWelcomeDetails(key) {
    }
}
