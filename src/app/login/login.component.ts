import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ValidateService } from '../services/validate.service';
import { Router } from '@angular/router';
import { AppsocketService } from '../services/appsocket.service';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  //----------------------------------//
	username:string;
	password: string;

  //-----Component states ----//
  alertLoginError: boolean = false;
  errorMsg: string;
  //----------------------------------//
   @ViewChild("usernameInput") loginTpl;

  constructor(private auth: AuthService,
        private validateService: ValidateService,
  			private router: Router,
        private appSocketService: AppsocketService,
        private REST: RestService ) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.loginTpl.nativeElement.focus();
  }

  doLogin(){
    //CLEAR any error messages before submit form
    this.dropLoginErrorMsg();
  	const userAuth = {
  		username: this.username,
  		password: this.password
  	}
    if(!this.validateService.validateLoginForm(userAuth)){
      this.showLoginErrorMsg('Please fill in required fields')
    } 

    else {
      this.auth.authenticateUser(userAuth).subscribe(data => {
        if(data.success){
          this.auth.storeUserData(data.token, data.user);
          this.appSocketService.initSocket();
          this.appSocketService.registerNewUserSession();
          this.router.navigate(['/dashboard'])
        } else {
          this.showLoginErrorMsg(data.msg);
        }
      });
    }
  	
  }




  //----- Dom Utilities------------------//
  showLoginErrorMsg(msg): void{
    this.errorMsg = msg;
    this.alertLoginError =  true;
  }

  dropLoginErrorMsg(): void {
    this.errorMsg = '';
    this.alertLoginError = false;
  }


}
