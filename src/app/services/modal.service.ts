import { Injectable } from '@angular/core';
import { SocketSession } from '../models/socket.session';

@Injectable()
export class ModalService {

//-----------------------------------------------//
private inviteGameData: SocketSession = null;
//-----------------------------------------------//




  constructor() { }


//-------------- FUNCTIONS -----------------------------//
setInviteGameDataModal(o: SocketSession) {
	this.inviteGameData = o;
}

getInviteGameDataModal(): Object {
	if(this.inviteGameData != null){
		return {userTo: this.inviteGameData.username,
	 	sIdTo: this.inviteGameData.sId};
	} else {
		return null;
	}
}


}
