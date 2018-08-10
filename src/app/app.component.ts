import { Component } from '@angular/core';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  message = '';
  constructor(private _router: Router ) {
      _router.events.subscribe((url: any) => {
        if (url.url === '/form') {
          this.message = 'Profil investisseur';
        } else {
          if (url.url === '/dashboard') {
            this.message = 'Transaction';
          } else {
           this.message = '';
           }
        }
      } );
      // console.log(_router.url);
  }
}
