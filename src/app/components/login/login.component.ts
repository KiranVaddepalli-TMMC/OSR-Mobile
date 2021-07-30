import { Component, OnInit } from '@angular/core';
import { UserDO, ShopDO } from '../../models/model';
import { environment } from '../../../environments/environment';
import { LoginService  } from '../../service/login/index';
import { CacheManagerService } from '../../service/common/cache.service';
import { Router } from '@angular/router'; // import router from angular router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  user: UserDO;
  appEnv: string;
  errorMsg: string;
  numList: string[];
  alphaList: string[];
  numPadFlag: boolean;
  noneSelectedFlag: boolean;
  nameFlag: boolean;
  cpcModule: string;
  switchStr: string;
  loading = false;
  error = '';
  msg: any;
  lang: any; 
  osrUser: any = {};
  //appmsgs: Message[] = [];
  


  constructor(private loginService: LoginService, private route:Router,
    private cacheMgr: CacheManagerService,) {
    this.user = new UserDO();
    this.numPadFlag = true;
    this.noneSelectedFlag = true;
    this.nameFlag = true;
    this.switchStr = "abc";

   }

  ngOnInit(): void {
    this.appEnv = environment.appEnv;
    this.errorMsg = '';
    this.user.loginId = 'vaddepallik';
    this.user.password = '123';
    this.noneSelectedFlag = true;
    
    this.numList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    this.alphaList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  }
/* **************************** */  
getShopList(shops: ShopDO[]): ShopDO[]
{
  console.log('in getSholist');
  let myShops: ShopDO[] = [];
  for (let i = 0; i < shops.length; i++){
    let shop = new ShopDO();
    shop.id = shops[i].id;
    shop.name = shops[i].name;
    
    myShops.push(shop);
  }
  
  return myShops;
}


/* *********************************** */
login() {
  this.hideMessage();
  this.error = '';
  this.loading = true;
  
  // this.route.navigate(['home']);
 
  this.loginService.signIn(this.user.loginId, this.user.password )
        .subscribe((result:any) => {
          console.log('in rsult');
          if (result && result.userDO) {
              console.log(' Authentication Sucessful- forwarding to home:: ');
            localStorage.setItem('osrUserInfo',JSON.stringify(result))
            this.osrUser = result.userDO;//this.cacheMgr.getCPCUserObj();
            //this.comService.shopList = this.osrUser.shops;
            
            // if (null != this.osrUser.shops) {
              this.cacheMgr.setShopList(this.getShopList(this.osrUser.shopDOList));
              this.cacheMgr.setCurrentUserName(this.user.loginId);
              this.route.navigate(['home']);
              this.loading = false;
            // } 
            
          } else {
            console.log('in else');
              this.errorMsg = 'Username or password is incorrect';
              console.log(this.error);                 
              this.loading = false;
          }
          },

     err => {  
       console.log('in err');
       this.loading = false;
       this.errorMsg = err; 
       this.handleError(err);
        
     }
);
}//login()






/* **************************** */ 
cancel() {
  this.user.loginId = '';
  this.user.password = '';
 this.nameFlag = true;
 this.noneSelectedFlag = true;
 this.errorMsg = '';
 this.nameFlag = true;
}
/* **************************** */  
/* **************************** */
close(){
    
}
/* ***************************** */
switchPads(){
  if (this.numPadFlag){
    this.numPadFlag = false; 
    this.switchStr = "123";
  }
  else{
    this.numPadFlag = true;
    this.switchStr = "abc";
  }

} 
/* ***************************** */
onNumPad(numpad: string){
  if (this.nameFlag){
    this.user.loginId = this.user.loginId + numpad;
  }
  else{
    this.user.password = this.user.password + numpad;
  }
  this.noneSelectedFlag = false;
  
}
/* ***************************** */
onAlphaPad(alphapad){
  if (this.nameFlag){
    this.user.loginId = this.user.loginId + alphapad;
  }
  else{
    this.user.password = this.user.password + alphapad;
  }
  this.noneSelectedFlag = false;
  
}
 inputSelected(){
  
  if (this.user.loginId !== ''){
   this.noneSelectedFlag = false; 
  }
  
  if (this.user.password !== ''){
    this.noneSelectedFlag = false;
  }
}
/* *************************************** */
 hideMessage() {
 // this.appmsgs = [];
}

 private handleError(error) {
  let errMessage: string;
  console.log('Error: ' + error.toString());

  errMessage = 'servererror';


  this.translateAndShow('error', errMessage);

}
private translateAndShow(msgType: string, key: string, detail?: string, val?: string) {
  this.hideMessage();

}
showMessage(severity: string, summary: string, detail: string, data?: string) {

}
/* ********************************** */
backSpace() {
  
  
} //backSpace()
/* ********************************** */
moveNext() {
  this.nameFlag = false;
  
}



}
