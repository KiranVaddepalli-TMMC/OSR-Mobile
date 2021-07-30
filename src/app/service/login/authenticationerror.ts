


export class AuthenticationError {
  key = 'servererror.invalidlogin';
  params: any;
  // logoutService: LogoutService;
  AuthenticationError(){
     const pathName = window.location.pathname;
  }
 
  toString() {
//   this.logoutService = new LogoutService();
//   this.logoutService.callComponent();   
    const path = window.location.origin + window.location.pathname + '#/login';
    this.params = { 'linkName': path };
    console.log('AuthenticationError - redirecting to login: ' + JSON.stringify(this.params));
    return this.key;
    }
  getParams() {
  return this.params;
  }
}
