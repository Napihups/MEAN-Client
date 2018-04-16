import { Component, OnInit } from '@angular/core';
import { AppsocketService } from '../services/appsocket.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	public uos_component_states;

  constructor(private appSocketService: AppsocketService,
  			private authService: AuthService ) { }

  ngOnInit() {
    console.log("DashboardComponent created ---")
  	let a = this.authService.getUser();
  	this.uos_component_states = {
  		title: "Online",
  		authName: a.username
  	}

  }




}
