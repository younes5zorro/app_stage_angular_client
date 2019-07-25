import { Component } from '@angular/core';
import { Router } from '../../node_modules/@angular/router';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  message = '';
  constructor(public _router: Router ) {
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
  download() {
    html2canvas(document.getElementById('report')).then(function(canvas) {
      const img = canvas.toDataURL('image/png');
      const doc = new jsPDF();

      doc.addImage(img, 'JPEG', 10, 30, 190, 250);
      doc.save('report.pdf');
    });
  }
}
