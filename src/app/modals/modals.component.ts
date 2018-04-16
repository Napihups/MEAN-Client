import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AppsocketService } from '../services/appsocket.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'modal-template',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.css']
})
export class ModalsComponent implements OnInit {


  constructor(private modelService: ModalService,
  			private appSocketService: AppsocketService,
  			private authService: AuthService) { }

  ngOnInit() {
  }

  sendInvite(socketSess){
  	this.appSocketService.inviteNewGame({
  		sIdTo: socketSess.sIdTo, 
  		toName: socketSess.userTo
  	});
  }

}
