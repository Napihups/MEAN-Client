import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

/*
	This service is a rest API to serve MONGO DB data only 
*/
@Injectable()
export class RestService {

  private server_domain: string = "http://localhost:3000/";

  constructor(private http: Http,
  			private auth: AuthService) {

  	console.log("Rest Service created");
   }




//-------- FUNCTIONS ---------------------------------------//
	getAllInvites() {
		let headers = this.auth.createHeadersForAuth();
		return this.http.get(this.server_domain + 'invites/',
			{headers: headers})
		.map(res => res.json());
	}
}
