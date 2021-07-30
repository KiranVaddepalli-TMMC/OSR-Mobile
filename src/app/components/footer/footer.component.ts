import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { environment } from '../../../environments/environment';
import {filter} from 'rxjs/operators'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  loginId:string;
  versionNumber: string;
  constructor(public router:Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(resp =>{
      if(localStorage.getItem('osrUserInfo')){
        this.loginId = JSON.parse(localStorage.getItem('osrUserInfo')).userDO.loginId;
      }else{
        this.loginId = null;
      }
    })
   }

  ngOnInit(): void {
    this.versionNumber = environment.versionNumber;
  }

}
