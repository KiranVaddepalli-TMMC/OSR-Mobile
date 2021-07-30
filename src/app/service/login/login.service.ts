import { environment } from '../../../environments/environment';
import { CacheManagerService } from '../common/cache.service';
//import { HttpReqService } from '../common/http-req.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { throwError } from 'rxjs';
//import { Headers, Response } from '@angular/core/';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/catch'; 
//import 'rxjs/add/operator/map';
//import { URLSearchParams, RequestOptions } from '@angular/http';
//import { throwError } from 'rxjs';



@Injectable()
export class LoginService {
  isLoggedIn = false;
  public token: string;
  private hostURL: string;


  constructor(private http: HttpClient, private cacheMgr: CacheManagerService) {
    this.hostURL = environment.apiUrl;
  }


  signIn(loginId: string, password: string) {
    const myParam = new HttpParams()
                    .set('auth_username', loginId)
                    .set('auth_password', password)
                    .set('is_mobile', 'YES');
    
  
  // myParam.append('auth_username', loginId);
  //   myParam.append('auth_password', password);
  //   myParam.append('is_mobile', 'YES');
    
    let loginSuccess = false;
    let loggedInUserInfo = '';
    //'security/mobilelogin' ;
    let mySecUrl = environment.apiUrlSecurity;
    
    let myUrl = mySecUrl + 'security/login.do';
    // const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    // myHeaders.append('Accept', 'application/json');
    console.log('Sending Request to:: ' + myUrl);

    //const myOptions = new Options({ headers: headers });

    return this.http.get(myUrl, {params: myParam});
    //return this.http.get(myUrl, { headers: myHeaders, params: myParam }); //.pipe(tap(res => {}));
/*
      .map((response: Response) => {
        if (response !== null) {
          const respStatus = response.status;
          console.log('in login service' + response);
          if (respStatus < 200 || respStatus >= 300) {
            throw response;
          } else {
            const usrJson = response.json().authenticationInfo;
    
            loginSuccess = response.json() && response.json().authenticationInfo.authenticated;
    
            if (usrJson != null && loginSuccess) {
              this.token = usrJson.token;
              loggedInUserInfo = response.json();
    
              if (this.token) {
                localStorage.setItem('UserInfo', JSON.stringify({
                  lastactivetime: this.cacheMgr.getCurrentTime(),
                  token: this.token, UserInfo: loggedInUserInfo
                }));
              }
              return true;
            } else {
              // do something ?
              this.isLoggedIn = false;
            }
          }
          }
      });*/
  }

  public signout()  {
    
    let myUrl = this.hostURL + 'security/logout.do';
    console.log('Calling Logout... ' + myUrl); //+ '/security/logout.do');
    
    let myHeaders = new HttpHeaders();
    //myHeaders = this.httpService.attachHeaders(myHeaders);
    
    let myParams = new HttpParams();
    myParams.append("shop", this.cacheMgr.getCurrentShop());
    
    
    return this.http.get(myUrl, { headers: myHeaders, params: myParams });
    
  }

  public logOutUser() {
    //  remove user from local storage to log user out
    this.cacheMgr.logOutUser();
    this.isLoggedIn = false;

  }
/*
  private handleError(error: Response) {
    console.error(error);
    this.logOutUser();
    return throwError(error.json);//   throwError(error.json() || 'Server error:: ');
    
    //return Observable.throw(error.json().error || 'Server error:: ');
  }
*/




}
