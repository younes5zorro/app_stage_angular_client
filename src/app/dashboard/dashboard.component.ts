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

  slug = 'test';

  constructor(private winRef: WindowRef, private _reponseService: ReponseService) {
    // Add license key
    winRef.nativeWindow.ZoomChartsLicense = 'ZCS-hqv17dh8w: ZoomCharts SDK Single Developer\
 Licencefor sup..@..n.com (valid for development only); upgrades until: 2019-08-06';

    winRef.nativeWindow.ZoomChartsLicenseKey = '2253cac4c50b3ac66988d80bf591f685501467d134b235a5b0\
6595f3b4376f98cdc13cb3285f7b2df7ed983f638f1bfaab922ebeffb11754815153c2508a05d\
a753dc0c7b153d344a028b73072db4afa88d1ecbb1d6d9cbb6e6f05faa5aa8c63278fbbbb7c09\
1d625171fba6abf403c68217459c7bbc8c246bc8cfcd3df0ab78b62c53aa168537c7bc224c5fa\
d63a046c10591fb9ae66de0e5000e38b4a9af6a0d15d26f01c6950f5f4e5b701c5160a2d25b05\
df3da5fa038446d48ede3e5913a15fd2fe08862010b93188d08bad499ac93892609dfde71472c\
cd5d0fa5aedcc49f72eb9ed343ddb95234af371ee4dd505ffbd79faac2ffd59d00a7e32b9a8a9';

  }
  onChange(event) {
    this.charge(event._id.slug);
  }
  ngOnInit() {

    this._reponseService.getActions()
    .subscribe(res => this.actions = res);
    // this.slug  = this.actions[0]._id.slug;

  }

  charge(slg) {
    const TimeChart = this.zc.TimeChart;
    const chart = new TimeChart ({
      container: document.getElementById('chartPieChart'),
      navigation : {
        initialDisplayUnit: 'd'
       },
      area: { height: 350 },
      series: [
        {
            data: {
              index: 1,
              aggregation: 'avg',
            },
            type: 'line',
            name: 'Cours',
            style: {
                lineWidth: 2,
                lineColor: '#09c',
            }
        }
       ],
      data:
      {
        units: ['d'],
        timestampInSeconds: true,
        url: 'http://localhost:3000/api/dash/' + slg
      }

    });
  }
  ngAfterViewInit(): void {
    this.charge(this.slug);
  }


}
