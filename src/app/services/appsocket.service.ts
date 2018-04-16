import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs/Rx';
import { SocketSession } from '../models/socket.session';
import { RedisService } from './redis.service';

@Injectable()
export class AppsocketService {

  //-------------------------------------------------------------------------//
  constructor(private wsService: WebsocketService,
            private authService: AuthService,
            private Redis: RedisService ) {
    console.log("AppSocketService created ---");

    if(authService.isAuthenticated()){
      // this code will run when user refreshed the app !!!
      this.wsService.connect();
      this.wsService.registerNewUserSessionSocket(this.authService.getAuthToken());
    } else {
    }

  }

  //-------------------------------------------------------------------------//
  initSocket(){
    this.wsService.connect();
  }

  //--------------------------------------------------------------------------//

  subsUpdateOnlineUserStats(){
    return this.wsService.updatingNewUser();
  }
  //-------------------------------------------------------------------------//
  notifyUserOnline(){
    return this.wsService.observeUserOnline();
  }
  //-------------------------------------------------------------------------//
  notifyUserOffline(){
    return this.wsService.observeUserOffline();
  }
  //-------------------------------------------------------------------------//
  notifyNewGameInvite() {
    return this.wsService.observeNewGameInvitation();
  }



  //---------------------------------------------------------------------------//
  registerNewUserSession() {
    this.wsService.registerNewUserSessionSocket(this.authService.getAuthToken());
  }
  //-------------------------------------------------------------------------//
  inviteNewGame(socketId) {
    this.wsService.inviteNewGame(socketId);
  }

  //-------------------------------------------------------------------------//

  disconnectSocket(){
    this.wsService.disconnect();
  }


}
