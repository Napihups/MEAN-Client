import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegisterForm(user) {
  	if(user.name == undefined || 
  		user.email == undefined ||
  		user.username == undefined ||
  		user.password == undefined){
  		return false;
  	}else {
  		return true;
  	}
  }

  validateEmail(email) {
  	var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(email).search (filter) != -1;
  }

  validateLoginForm(userAuth) {
    if(userAuth.username == undefined ||
      userAuth.username == '' ||
      userAuth.password == undefined ||
      userAuth.password == ''){
      return false;
    } else {
      return true;
    }
  }

}
