import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment';
import { SocketSession } from '../models/socket.session'; 
import { GameInvite } from '../models/game.invite';

@Injectable()
export class WebsocketService {


private socket;

  constructor() { }


  connect() {
    this.socket = io('ws://localhost:3000/');
  }


  // -----------------------------------------//
  //              EMITING DATA 
  //------------------------------------------//
  registerNewUserSessionSocket(token) {
    this.socket.emit('new user', token)
  }

  inviteNewGame(payLoad) {
    this.socket.emit('invite new game', payLoad);
  }


  // -----------------------------------------//
  //              Observable 
  //------------------------------------------//
  updatingNewUser() {
    let observable = new Observable(obs => {
      this.socket.on('update users', (list) => {
        obs.next(list);
      });
      return () => {this.socket.disconnect();}
    })

    return observable;
  }
  //-------------------------------------------------------------------------//
  observeUserOnline() {
    let observable = new Observable(obs => {
      this.socket.on('notify user online',(sess:SocketSession) => {
        obs.next(sess);
      });
      return () => {this.socket.disconnect();}
    })

    return observable;
  }
  //-------------------------------------------------------------------------//
  observeUserOffline() {
    let observable = new Observable(obs => {
      this.socket.on('notify user offline', (sess:SocketSession) => {
        obs.next(sess);
      });
      return () => {this.socket.disconnect();}
    })

    return observable;
  }
  //-------------------------------------------------------------------------//
  observeNewGameInvitation() {
    let observable = new Observable(obs => {
      this.socket.on('new game invitation', (inv: GameInvite) => {
        console.log("Game invite : ", inv);
        obs.next(inv);
      });
      return () => {this.socket.disconnect();}
    })

    return observable;
  }

  //-------------------------------------------------------------------------//
  disconnect():void {
    this.socket.disconnect();
  }


}
