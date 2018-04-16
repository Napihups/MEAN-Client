import { Component, OnInit } from '@angular/core';
import { RedisService } from '../services/redis.service';

@Component({
  selector: 'game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.css']
})
export class GameCanvasComponent implements OnInit {


//---------------------STATES -----------------------------//
private searchResult: string[] = [];
searchInputVal:string;
anyResult: boolean = false;
isUserInGame : boolean = false;
	
//---------------------------------------------------------//
  constructor(private Redis: RedisService) { }

  ngOnInit() {
  }             

  doSearch() {
    if(this.searchInputVal != ''){
      this.Redis.searchSession(this.searchInputVal).subscribe(e => {
        if(e.success){
          this.searchResult = e.data;
          if(e.data.length === 0){
            this.anyResult = false;
          } else if(e.data.length > 0){
            this.anyResult = true;
          }
        }
      })
    } else {
      this.anyResult = false;
    }
    if(this.searchInputVal === ''){
      this.searchResult = [];
    }
  }

  isThereAnyResult(){
    return this.anyResult;
  }

  test(text){
    console.log(text);
  }


}
