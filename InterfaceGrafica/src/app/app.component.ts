import { Component, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'app-redes';
  subscription:Subscription;
  refresh=false;
  constructor(private router:Router){
//arreglar este pedo
/*this.subscription = this.router.events.subscribe((event) => {
  this.subscription.unsubscribe();
      if (event instanceof NavigationStart){
       this.refresh=true;
        this.router.navigate(['inicio']);

      }
  });*/


  }

}
