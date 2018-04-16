import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateRouteGuard } from './services/can-activate-route.guard';
//------------SERVICES---------------------------------//
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { WebsocketService } from './services/websocket.service';
import { AppsocketService } from './services/appsocket.service';
import { RestService } from './services/rest.service';
import { RedisService } from './services/redis.service';
import { ModalService } from './services/modal.service';

//--------COMPONENTS -----------------------------------//
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { UserOnlineStatsComponent } from './user-online-stats/user-online-stats.component';
import { GameCanvasComponent } from './game-canvas/game-canvas.component';
import { ModalsComponent } from './modals/modals.component';


const appRoutes: Routes = [
  
  {path:'', component: HomeComponent},
  { path:'register', component: RegisterComponent},
  { path:'login', component: LoginComponent},
  { path:'dashboard', component: DashboardComponent, canActivate: [CanActivateRouteGuard]},
  { path:'profile', component: ProfileComponent, canActivate: [CanActivateRouteGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    UserOnlineStatsComponent,
    GameCanvasComponent,
    ModalsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ValidateService, 
    AuthService,
    CanActivateRouteGuard,
    WebsocketService,
    AppsocketService,
    RestService,
    RedisService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
