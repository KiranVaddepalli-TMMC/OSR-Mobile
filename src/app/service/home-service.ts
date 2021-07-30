import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable()
export class HomeService {

    constructor(private  http: HttpClient) { }

    getWelcomeDetails() {
        let myUrl = environment.apiUrl + 'preWelcome';
        
        return this.http.get(myUrl);
    }

    postScan(obj) {
        console.log(obj)
        let myUrl = environment.apiUrl + 'addScanItems';
        return this.http.post(myUrl, obj)
    }

    validateScan(data){
        let myUrl = environment.apiUrl + 'validateScanData';
        return this.http.post(myUrl, data)
    }

    getContainerStatus(body){
        let myUrl = environment.apiUrl + 'containerLiftStatus';
        return this.http.get(myUrl,{params:body})
    }

    checkLiftStatus(body){
        let myUrl = environment.apiUrl + 'checkLiftStatus';
        return this.http.get(myUrl,{params:body})  
    }

    uploadToContainer(body){
        let myUrl = environment.apiUrl + 'uploadToContainer';
        return this.http.get(myUrl,{params:body})     
    }
    completeContainer(body){
        let myUrl = environment.apiUrl + 'updateContainerStatus';
        return this.http.get(myUrl,{params:body})     
    }
}
