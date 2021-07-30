import { environment } from '../../../environments/environment';
import { Injectable, OnInit, OnDestroy } from '@angular/core';

import { CacheManagerService } from './cache.service';
import { HttpReqService } from './http-req.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/throw';

@Injectable()
export class AppLoggerService implements OnInit, OnDestroy {

  private subscription: Subscription;

  private consoleLog = null;
  private enabled = true;

  constructor(private cacheMgr: CacheManagerService,
    private httpreqService: HttpReqService) {

  }

  ngOnInit() {
    this.enabled = this.isConsoleLogEnabled();
  }

  public info(locationHref: string, message: string, loginId: string, errorStack: string) {
   this.writeToServerLog(locationHref, message, 'info', loginId, errorStack);
    if (this.isConsoleLogEnabled()) {
      console.log(message);
    }
  }

  public error(locationHref: string, msg: string, loginId: string, errorStack: string) {
    
    if (this.enabled) {
      //console.log(msg);
      //console.log('Comple Error:\n'+errorStack);
      this.writeToServerLog(locationHref, msg, 'error', loginId, errorStack);
    }
   
  }

  get log() {
    if (this.enabled) {
      return console.log.bind(window.console);
    }
  }

  get debug() {
    if (this.enabled) {
      return console.debug.bind(window.console);
    }
  }

  private isConsoleLogEnabled() {
    this.enabled = environment.enableLog;
    console.log('Is Log Enabled:: ' + this.enabled);

    if (!this.enabled) {
      console.log('******* Console Log Not Enabled ********* ');
      this.disableLogger();
    }
    return this.enabled;
  }


  private enableLogger() {

    if (this.consoleLog !== null) {
      window['console']['log'] = this.consoleLog;
    }
    console.log('%%%%%%%%%%%% LOG Enabled %%%%%%%%%%%%%');
  }

  private disableLogger() {
    console.log('%%%%%%%%%%%% Disabling LOG %%%%%%%%%%%%%');

    this.consoleLog = console.log;
    window['console']['log'] = function() { };
  }


  private writeToServerLog(
    locationHref: string, msgContent: string, msgType,
    loginId: string, errorStack: string) {

    const errorLogURL = environment.apiUrlSecurity + 'weblogging.do';
    console.log(':::: Attempting to write the log to Server :::::');

    // let curDate = new Date();
    //  console.log("Current DateTime:" + curDate);

    const browserInfo = 'TimeZone::' + (new Date()).getTimezoneOffset() / 60 + ' & ' +
//      ' Platform:: ' + navigator.platform + '&' +
      ' Browser:: ' + navigator.appName + ' & '; // +
//      ' Version:: ' + navigator.appVersion;

    const details = {
      url: window.location.href,
      type: msgType,
      message: msgContent,
      userName: loginId,
      clientId: browserInfo,
      dateTimeStamp: new Date().toLocaleDateString(),
    };
     console.log(' The details are::: ' + JSON.stringify(details));
    try {

       this.httpreqService.post(errorLogURL, details)
        .subscribe(
        data => { try { } catch (e) { /** suppressing it **/ } },
        error => { try { console.log('Error while Logging to Server - Gun:', error); } catch (e) { /** suppressing it **/ } },
        (): void => { console.log('message logging to server complete..'); }

        );
    } catch (e) {
      //this.subscription.unsubscribe();
    }
  }
  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
}
