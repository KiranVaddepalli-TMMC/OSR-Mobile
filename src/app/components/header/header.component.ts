import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {filter} from 'rxjs/operators'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userLoggedIn = false;
  constructor(private router:Router) {
    // if(localStorage.getItem('osrUserInfo')){
    //   this.userLoggedIn = true;
    // }else{
    const refernece =  this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(resp =>{
        if(localStorage.getItem('osrUserInfo')){
          this.userLoggedIn = true;
          // refernece.unsubscribe();
        }
      })
    // }
   }

  ngOnInit(): void {
  }

  onHomeClick(){
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(() =>
    this.router.navigate(['home'])
    )
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
    this.userLoggedIn = false;
  }
}
