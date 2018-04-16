import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppsocketService } from '../services/appsocket.service';
import { GameInvite } from '../models/game.invite';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

	//-----component states -------------//
  accountName: string;
  listInvitation: GameInvite[] = [];

	//-----------------------------------//

  constructor(private router: Router,
  			private authService: AuthService,
        private appsocketService : AppsocketService,
        private Rest: RestService) {
  }


  ngOnInit() {
    if(this.authService.isAuthenticated()){
        
        this.appsocketService.notifyNewGameInvite().subscribe((e: GameInvite) => {
          this.listInvitation.push(e);
          console.log("From Navbar comp : ", this.listInvitation);
        })
    } else {
      // do nothing
    }
  }

  doLogout(){
  	this.authService.logoutUser();
    this.appsocketService.disconnectSocket();
  	this.router.navigate(['/']);
  }

 

  goDashboard(){
    this.router.navigate(['/dashboard']);
  }

  goProfile(){
    this.router.navigate(['/profile']);
  }

  isAuthenticated(): any {
    if(this.authService.isAuthenticated()){
      this.accountName = this.authService.getUser().username;
      return true;
    } else {
      return false;
    }
  }




}
