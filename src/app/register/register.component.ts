import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  @ViewChild('nameInput') nameInput;

  constructor(private validateService: ValidateService,
  			  private auth: AuthService,
  			  private router: Router) {}

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.nameInput.nativeElement.focus();
  }

  //------ngModels-----//
  name: string;
  email: string;
  username: string;
  password: string;

  show: boolean = true;
  //-------------------//

  doRegister(): any{
  	const user = {
  		name: this.name,
  		email: this.email,
  		username: this.username,
  		password: this.password
  	}

  	//Require Fields
  	if(!this.validateService.validateRegisterForm(user)){
  		// this.flashMsgService.show('Please fill in all fields',
  		//  {cssClass: 'alert-danger',
  		//  timeout: 3000})
  		return false;
  	} else {

  		if(!this.validateService.validateEmail(this.email)){
	  		// this.flashMsgService.show('Email Invalid',
	  		//  {cssClass: 'alert-danger',
	  		//  timeout: 3000})
	  		// return false;
  		} else {
  			this.auth.registerUser(user).subscribe(data => {
  				if(data.success) {
  					// this.flashMsgService.show('Register Successful, you can now login...',
			  		//  {cssClass: 'alert-success'});
       //      this.show = false;
  				}else {
  					// this.flashMsgService.show('Register failed',
			  		//  {cssClass: 'alert-danger',
			  		//  timeout: 3000})
  					this.router.navigate(['/register']);
  				}
  			});
  		}
  	}
 

  }

  clearForm():void {
  	this.name = '';
  	this.email = '';
  	this.username = '';
  	this.password = '';
  }

}
