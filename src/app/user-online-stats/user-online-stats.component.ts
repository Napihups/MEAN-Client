import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AppsocketService } from '../services/appsocket.service';
import { SocketSession } from '../models/socket.session';
import { RestService } from '../services/rest.service';
import { RedisService } from '../services/redis.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'user-online-stats',
  templateUrl: './user-online-stats.component.html',
  styleUrls: ['./user-online-stats.component.css']
})
export class UserOnlineStatsComponent implements OnInit, AfterViewInit {

	@Input() private uos_state: any;

	private onlineListing: SocketSession[] = []; // should be list
  private selectedOpponent: SocketSession;

  constructor(private appSocket: AppsocketService,
            private REDIS: RedisService,
            private ModalService: ModalService ) {
  }

  ngAfterViewInit() {

  }

  ngOnInit() {
    this.REDIS.getSocketSession().subscribe(e => {
        if(e.success){
          this.updateOnlineListStat(e.data);
          console.log(e.data);
        }
      })
  	this.appSocket.notifyUserOnline().subscribe((obj: SocketSession) => {
      if(this.checkIfSessionAlreadyInList(obj)){
        // do nothing --- to ensure that the same user session is not pushed into the list as bug 
      } else {
        if(this.isThisYou(obj)){
          // dont' push to the list if the session is you 
        } else {
           // this.onlineListing.push(obj);
           //update contexts
           this.onlineListing.push(obj);
        }
      }
    });
    this.appSocket.notifyUserOffline().subscribe((obj: SocketSession) => {
      this.deleteOfflineUser(obj);
    })
  }



  //-------------FUNCTIONS --------------------------------//

  private isThisYou(user): boolean {
  	if(user.username === this.uos_state.authName){
  		return true;
  	} else {
  		return false;
  	}
  }
  //-------------------------------------------------------------------------//
  private isAnyoneOnline(): boolean{
  	if(this.onlineListing.length === 0){
  		return false;
  	} else if(this.onlineListing.length > 0) {
  		return true;
  	}
  	
  }
  //-------------------------------------------------------------------------//
  private updateOnlineListStat(list): void {
    for (var i = list.length - 1; i >= 0; i--) {
        let sockSess:SocketSession = list[i];
        if(sockSess.username === this.uos_state.authName){
          continue;
        } else {
          if(this.checkIfSessionAlreadyInList(sockSess)){
            continue;
          } else {
            this.onlineListing.push(sockSess);
          }
        }
    }
  }

  //-------------------------------------------------------------------------//
  private checkIfSessionAlreadyInList(socketSess: SocketSession): boolean {

    for(let i = 0; i < this.onlineListing.length; i++){
      let sess: SocketSession = this.onlineListing[i];
      if(sess.username === socketSess.username){
        return true;
      } else {
        continue;
      }
    }
    return false;
  }
  //-------------------------------------------------------------------------//
  private deleteOfflineUser(sess: SocketSession): void {
    for (var i = this.onlineListing.length - 1; i >= 0; i--) {
      if(this.onlineListing[i].username === sess.username){
        this.onlineListing.splice(i, 1);
      }
    }
  }
  //-------------------------------------------------------------------------//

  createModal(socketTo: SocketSession){
    this.ModalService.setInviteGameDataModal(socketTo);
    console.log("Modal Created ");
  }
}
