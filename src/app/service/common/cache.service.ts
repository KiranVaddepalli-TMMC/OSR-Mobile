import { environment } from '../../../environments/environment';
import { ShopDO } from '../../models/model';
import { Injectable, Attribute } from '@angular/core';
import { ParameterDeclaration } from 'typescript';
import { UserDO } from '../../models/model';

@Injectable()
export class CacheManagerService {
  completeUserInfo: any;
  token: string;
  private currentTime;
  private timeFormat;
  private sessionTimeout = 0;
  appPrefix = '_OSRMOBILE_' ;
  shopList: ShopDO[];  
  osrUser: UserDO;
  
  constructor() {
      this.sessionTimeout = environment.sessionTimeout;
  }

  /** returns String containing everything in storage that is received from server **/
  public getLoggedInUserData() {
    const loggedInUser = localStorage.getItem('osrUserInfo');
    if (typeof (loggedInUser) !== 'undefined' && loggedInUser !== null
      && this.getAuthenticationInfo() !== null && this.getAuthenticationInfo() !== '') {
      return JSON.parse(loggedInUser);
    }
    return null;
  }


  /** returns String Authentication string from storage **/
  public getAuthenticationInfo() {
    const loggedInUser = localStorage.getItem('osrUserInfo');
    if (typeof (loggedInUser) !== 'undefined' && loggedInUser !== null && loggedInUser !== '') {
      return JSON.parse(loggedInUser).authenticationInfo;
    }
    return null;
  }

  /** returns TPTUser string without casting..  **/
  getOSRUserInfo() {

    const userInfo = this.getLoggedInUserData();
    if (typeof (userInfo) !== 'undefined' && userInfo !== null && userInfo !== '') {
      return userInfo;
    }
    return null;
  }


  /**  Writes given string as loggedinUser data **/
  writeUserData(OSRUserInfo) {
    localStorage.setItem('osrUserInfo', OSRUserInfo);
  }

  /* ************************************************************************** */
 

  /** returns TPTUser value Object after casting..  **/
  getCPCUserObj() {

    const userInfo = this.getLoggedInUserData();
    if (typeof (userInfo) !== 'undefined' && userInfo !== null && userInfo !== '') {
      return <UserDO>userInfo.userDO;
    }
    return null;
  }

  

  
  
  
  /* ************************************************************************* */

  /** appends any string to the TMRA info string in local storage **/
  chacheNewData(dataItemName: string, dataItemVal: any[]) {
    const existingUserInfo = this.getLoggedInUserData();
    const inputJson = JSON.stringify(dataItemName, dataItemVal);
    const newInfo = existingUserInfo + inputJson;
    localStorage.removeItem('osrUserInfo');
    localStorage.setItem('osrUserInfo', newInfo);
  }

  /** returns current active token **/
  getToken() {
    this.updateActiveTime();
    if (typeof (this.getLoggedInUserData()) !== 'undefined' && this.getLoggedInUserData() !== null) {

      if (typeof (this.getLoggedInUserData().token) !== 'undefined' && this.getLoggedInUserData().token !== '') {
        // console.log('getToen:: ' + this.getLoggedInUserData().token);
        return this.getLoggedInUserData().token;
      } else {
        if (typeof (this.getAuthenticationInfo()) !== 'undefined' && this.getAuthenticationInfo() !== null) {
          return this.getAuthenticationInfo().token;
        }
      }
    }
    return null;

  }

  /** logout user and cleans all the local storage variable data items **/

  logOutUser() {
    //if (this.getLoggedInUserData() !== null) {
    if (this.getCurrentUserName() !== null) {
      console.log("in logout");
      const len =1;
      let key = '';
      console.log(' Total lengh of Keys:: ' + len);
      for (let i = len; i >= 0; i--) {
        key = localStorage.key(i);
        // console.log( 'items: ' + i + ' - ' + localStorage.key( i ) ) ;
        // console.log('key(' + i + ')' + localStorage.key(i) );
        if (typeof (key) !== 'undefined' && key !== null && key !== '') {
          if (key.indexOf(this.appPrefix) > -1) {
            localStorage.removeItem(key);
          }
        }
      } // for

      //localStorage.removeItem('cpcUserInfo');
    }
  } 

  /** stores given user information in the local storage appending _TMRA_, for easy cleanup later **/
  cacheUserInfo(dataItemName: string, dataItemVal: any[]) {
    localStorage.setItem(this.appPrefix + dataItemName, JSON.stringify(dataItemVal));
  }

  /* ********************************* */
   replaceData(dataItemName: string, dataItemVal: any[]) {
    console.log('replacing .. removing ' + this.appPrefix + dataItemName);
    window.localStorage.removeItem(this.appPrefix + dataItemName);
    localStorage.setItem(this.appPrefix + dataItemName, JSON.stringify(dataItemVal));
    console.log('added ' + this.appPrefix + dataItemName + ' --- ' + JSON.stringify(dataItemVal) );
  }

  /* ********************************* */
   private getSavedSelection(deleteItOrNot, label) {
    const selection = localStorage.getItem(this.appPrefix + label);
    if (typeof (selection) !== 'undefined' && selection !== null) {
      if (deleteItOrNot) {
        localStorage.removeItem(this.appPrefix + label);
      }
      return JSON.parse(selection);
    }
  }

  /* ********************************* */
  getAnncmnts() {
    const anncmnts = localStorage.getItem(this.appPrefix + 'anncmnts');
    if (typeof (anncmnts) !== 'undefined' && anncmnts !== null && anncmnts !== '') {
      return JSON.parse(anncmnts);
    }
    return null;
  }

  /* ********************************* */
  updateActiveTime() {
    const existingUserInfo = this.getLoggedInUserData();
    if (typeof(existingUserInfo) !== 'undefined' && existingUserInfo !== null) {
        existingUserInfo.lastactivetime = this.getCurrentTime();
       localStorage.setItem('cpcUserInfo', JSON.stringify(existingUserInfo));
    }
  }

  /* ********************************* */
  getCurrentTime(): any {
    this.currentTime = new Date().getTime();
    return this.currentTime;
  }

  /* ********************************* */
  getUserLastActiveTime(): any {
    const existingUserInfo = this.getLoggedInUserData();
    if (typeof(existingUserInfo) !== 'undefined' && existingUserInfo != null) {
    const lastactiveTime = existingUserInfo.lastactivetime;
        return new Date(+lastactiveTime).getTime();
    }

    return 0;
  }

  /* ********************************* */
  isSessionValid() {
    console.log('getCurrentTime: ' + this.getCurrentTime());
    console.log('getLastActiveTime : ' + this.getUserLastActiveTime() + ' Max-inactive-time-config:: ' + this.sessionTimeout + ' minutes');
    console.log('time diff: ' + ((this.getCurrentTime() - this.getUserLastActiveTime()) / 1000));
    if (this.sessionTimeout ===  0 ) {
      this.sessionTimeout = 30;
    }

    if (this.sessionTimeout <= -1) {
      // Session never expires
      return true;
    }

    return true;
  }
/* ********************************** */
  //Reset shop Data
  resetShopList(){
    localStorage.removeItem('shopList');
  }
  
  /* ********************************* */
  
  
  /* ********************************* */
  getShopList() {
    let shopList = localStorage.getItem('shopList');
    
    if (typeof (shopList) !== 'undefined' && shopList !== null && shopList !== '') {
      return JSON.parse(shopList);
    }
    return null;
  }
 
 setShopList(shop: any) {
    localStorage.setItem('shopList', JSON.stringify(shop));
  }

  /* ********************************* */
 setCurrentShop(shop: string) {
    localStorage.setItem('currentShop', shop);
  }

 getCurrentShop() {
    return localStorage.getItem('currentShop');
  }
  /* ********************************* */
 setCurrentShopName(shop: string) {
    localStorage.setItem('currentShopName', shop);
  }

 getCurrentShopName() {
    return localStorage.getItem('currentShopName');
  }

  
  /* ********************************* */
 setCurrentUserName(user: string) {
   localStorage.setItem('currentUserName', user);
 } 
 getCurrentUserName() {
    return localStorage.getItem('currentUserName');
  }
 
/* ********************************* */
  setCurrentPdaSerial(pdaSerial: string){
    localStorage.setItem('currentPdaSerial', pdaSerial);
  }

  getCurrentPdaSerial(): string {
    return localStorage.getItem('currentPdaSerial');
  }
  
  
  
/* ********************************* */
  resetAllData() {
    //Reset all data
    
    localStorage.removeItem('shopList');
    localStorage.removeItem('currentShop');
    localStorage.removeItem('currentShopName');
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('osrUserInfo');
    
  }
  
  
  
}


