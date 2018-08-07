import { Component } from '@angular/core';
import { Router } from '../../node_modules/@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  router: Router;
  message = '';
  constructor(private _router: Router ) {
      _router.events.subscribe((url: any) => {
        if (url.url === '/form') {
          this.message = 'Profil investisseur';
        } else {
          if (url.url === '/') {
            this.message = 'Home';
          } else {
            if (url.url === '/dashboard') {
              this.message = 'Composition';
            } else {
              this.message = '';
            }
          }
        }
      } );
      // console.log(_router.url);
  }
}
