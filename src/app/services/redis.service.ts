import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class RedisService {

  private server_domain: string = "http://localhost:3000/";

  constructor(private http: Http,
  			private auth: AuthService) { }



  //--------------API service methods -----------------//
  getSocketSession() {
    let headers = this.auth.createHeadersForAuth();
    return this.http.get(this.server_domain + 'sessions/online',
     {headers: headers})
    .map(res => res.json());
  }

  searchSession(text) {
     let headers = this.auth.createHeadersForAuth();
    return this.http.get(this.server_domain + 
      "sessions/search?searchVal=" + text,
      {headers: headers})
    .map(res => res.json());
  }

}
