import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as zc from '@dvsl/zoomcharts';
import { WindowRef } from '../window-ref';
import { ReponseService } from '../reponse.service';
import { ActivatedRoute } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit  {
  private zc: any = zc;
  actions: any;

  selected: any = null;
  cards: any = null;
  tweets: any = null;
  test: any;


  constructor(private winRef: WindowRef, private _reponseService: ReponseService) {
    // Add license key
    winRef.nativeWindow.ZoomChartsLicense = 'ZCP-2jt1vsq8o: ZoomCharts SDK for PeaQock';

    winRef.nativeWindow.ZoomChartsLicenseKey = '1a89ca2621b420a6ab144f910ccc8cf7895f869f01d4c4de4a' +
    'aa67351f0416d83b09b7dea54d22a9c20a90783cf2796de366fd0a018f13790a36dc24cf7a1c5' +
    '290870c84f74844621e4ab5229681bcb229dd2fc90aaa6454af1578c81fe2056c97c29cef15c1' +
    'c606fc70e1fd7d89f978b7fe9d6e97387b2b16304a99f87c92729d821947c312144f1a8b6d57d' +
    'ffd1448da030a3578143b62f1f4a0b0fe1d2efb1670416898d86369c5059d1db5acf457b07448' +
    '3f24d4db6b98767566eafef4b259f9e59a12bd38ea15be4f2c3d681606c9f695032892c19091c' +
    'a8d8af12f5dc21dbc6035dc647e945a17d39d67e17bbde56ce9311cab3d38d70e6db842771adc';
//     // Add license key
//     winRef.nativeWindow.ZoomChartsLicense = 'ZCS-hqv17dh8w: ZoomCharts SDK Single Developer\
//  Licencefor sup..@..n.com (valid for development only); upgrades until: 2019-08-06';

//     winRef.nativeWindow.ZoomChartsLicenseKey = '2253cac4c50b3ac66988d80bf591f685501467d134b235a5b0\
// 6595f3b4376f98cdc13cb3285f7b2df7ed983f638f1bfaab922ebeffb11754815153c2508a05d\
// a753dc0c7b153d344a028b73072db4afa88d1ecbb1d6d9cbb6e6f05faa5aa8c63278fbbbb7c09\
// 1d625171fba6abf403c68217459c7bbc8c246bc8cfcd3df0ab78b62c53aa168537c7bc224c5fa\
// d63a046c10591fb9ae66de0e5000e38b4a9af6a0d15d26f01c6950f5f4e5b701c5160a2d25b05\
// df3da5fa038446d48ede3e5913a15fd2fe08862010b93188d08bad499ac93892609dfde71472c\
// cd5d0fa5aedcc49f72eb9ed343ddb95234af371ee4dd505ffbd79faac2ffd59d00a7e32b9a8a9';

  }
  onChange(event) {
    if (event._id.slug !== this.selected) {
      this.selected = event._id.slug;
      this.chargeDash(event._id.slug, event._id.designation);
      this.chargeCard(event._id.slug);
    }
  }
  ngOnInit() {

    this._reponseService.getActions()
    .subscribe(res => this.actions = res);
  }

  chargeDash(slg, designation) {
    const TimeChart = this.zc.TimeChart;
    const chart = new TimeChart ({
      container: document.getElementById('chartPieChart'),
      navigation : {
        initialDisplayUnit: 'd'
       },
      area: { height: 350 },
      legend: {
        enabled: true
      },
      series: [
        {
            data: {
              index: 3,
              aggregation: 'avg',
            },
            type: 'line',
            name: designation,
            style: {
                lineWidth: 3,
                lineColor: '#4812e0',
            }
        },
        {
          data: {
            index: 4,
            aggregation: 'avg',
          },
          type: 'line',
          name: 'Benchmark',
          style: {
              lineWidth: 3,
              lineColor: '#18d044',
          }
        }

       ],
      data:
      {
        units: ['d'],
        timestampInSeconds: true,
        url: 'http://localhost:3000/api/masi/' + slg
      }

    });
  }
  chargeCard(slg) {

    this.tweets = null;
    this._reponseService.getForCard(slg)
    .subscribe(res => {
      this.cards = res;
    });

    this._reponseService.getTweets(slg)
    .subscribe(res => {
      this.tweets = res;
      console.log( this.tweets);
    });

  }

  ngAfterViewInit(): void {
    // this.charge(this.slug);
  }


}
