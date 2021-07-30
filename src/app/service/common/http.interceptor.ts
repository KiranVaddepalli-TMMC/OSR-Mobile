import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import  {Observable} from 'rxjs';
import { CacheManagerService } from './cache.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public cacheMgr: CacheManagerService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cacheMgr.getToken() || "";
    
    request = request.clone({
      setHeaders: {
        "X-AUTH-TOKEN": token
      }
    });
    return next.handle(request);
  }
}
