import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable()
export class Authentication {

    constructor(  http: HttpClient) { }

    getTourPackages(key) {
        // return this.http.get(`${environment.api}tourpackages`, { params: { tourguiderId: key, type: 'packages' } })
    }
}
