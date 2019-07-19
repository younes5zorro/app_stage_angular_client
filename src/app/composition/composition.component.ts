import { Component, OnInit } from '@angular/core';
import { WindowRef } from '../window-ref';
import * as zc from '@dvsl/zoomcharts';
import { ReponseService } from '../reponse.service';
import {Router, ActivatedRoute} from '@angular/router';
;
@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrls: ['./composition.component.css']
})
export class CompositionComponent implements OnInit {
  private zc: any = zc;
  // url  = 'https://robo-advisor-back.herokuapp.com';
  url  = 'http://localhost:3000';

  profile: any;
  constructor(private route: ActivatedRoute, private router: Router, private winRef: WindowRef, private _reponseService: ReponseService) {
     winRef.nativeWindow.ZoomChartsLicense = 'ZCP-2jt1vsq8o: ZoomCharts SDK for PeaQock';

    winRef.nativeWindow.ZoomChartsLicenseKey = '1a89ca2621b420a6ab144f910ccc8cf7895f869f01d4c4de4a' +
    'aa67351f0416d83b09b7dea54d22a9c20a90783cf2796de366fd0a018f13790a36dc24cf7a1c5' +
    '290870c84f74844621e4ab5229681bcb229dd2fc90aaa6454af1578c81fe2056c97c29cef15c1' +
    'c606fc70e1fd7d89f978b7fe9d6e97387b2b16304a99f87c92729d821947c312144f1a8b6d57d' +
    'ffd1448da030a3578143b62f1f4a0b0fe1d2efb1670416898d86369c5059d1db5acf457b07448' +
    '3f24d4db6b98767566eafef4b259f9e59a12bd38ea15be4f2c3d681606c9f695032892c19091c' +
    'a8d8af12f5dc21dbc6035dc647e945a17d39d67e17bbde56ce9311cab3d38d70e6db842771adc';

    this.route.queryParams.subscribe(params => {

      this.profile = params['profil'];
      if(! this.profile){
        this.router.navigateByUrl('/form');
      }

      // this.firstname = params["firstname"];
      // this.lastname = params["lastname"];
    });

   }

  ngOnInit() {
    this.chargeDash();
  }
  chargeDash() {
    const PieChart = this.zc.PieChart;
    const chart = new PieChart({
    container: document.getElementById('chartPieChart'),
    interaction: {
      mode: 'select',
      resizing: {
          enabled: false
      }
    },
    data: { url: this.url + '/api/profil/' + this.profile },
    labels: {enabled: false},
    legend: {
      enabled: true,
      numberOfColumns: 2,
      equalizeRowsColumns: false, // entries in the next row or column will split by one
      marker: {shape: 'circle', size: 30}
    },
    pie: {
      innerRadius: 0
      },
    slice: {
        expandableMarkStyle: {
            lineWidth: 0
        }
    },
    toolbar: {
        fullscreen: true,
        enabled: true
    }
  });
  }

}
