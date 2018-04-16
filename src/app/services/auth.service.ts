import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

	authToken: any;
	user: any;

  constructor(private http: Http) { 
     // console.log("Auth service is created ...");
  }


  // ---------------non-auth requests --------------------------//

  registerUser(user) {
  	let headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post('http://localhost:3000/users/register', user,
  	 {headers: headers})
  	.map(res => res.json());
  }

  authenticateUser(userAuth) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/login', userAuth,
     {headers: headers})
    .map(res => res.json());
  }

  //---------------------------------------------------------//



  // --------------Auth required requests ----------------------// 
  getAccountData() {
    this.loadTokenData();
    return this.http.get('http://localhost:3000/users/profile',
     {headers: this.createHeadersForAuth()})
    .map(res => res.json());
  }

  //------------------------------------------------------------//


  // ----------------------UTILS ----------------------//
  createHeadersForAuth(): Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + localStorage.getItem('token_Id'));
    return headers;
  }

    storeUserData(token, user) {
    localStorage.setItem('token_Id', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logoutUser() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


  loadTokenData(){
    this.authToken = localStorage.getItem('token_Id');
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  isAuthenticated(): boolean {
    let t = localStorage.getItem('token_Id');
    let u = localStorage.getItem('user');
    if(t != null && u != null){
      return true;
    }else {
      return false;
    }
  }

  getAuthToken(){
    /* for safety reason, get it directly from localstorage*/
    if(this.isAuthenticated()){
      return localStorage.getItem('token_Id');
    } else {
      return null;
    }
  }

  getUser() {
    if(this.isAuthenticated()){
      return JSON.parse(localStorage.getItem('user'));
    } else {
      return null;
    }
  }


}
