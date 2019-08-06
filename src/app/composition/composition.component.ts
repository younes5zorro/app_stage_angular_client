import { Component, OnInit } from '@angular/core';
import { WindowRef } from '../window-ref';
import * as zc from '@dvsl/zoomcharts';
import { ReponseService } from '../reponse.service';
import {Router, ActivatedRoute} from '@angular/router';

import { EChartOption } from 'echarts';

@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrls: ['./composition.component.css']
})
export class CompositionComponent implements OnInit {

  // chartOption: EChartOption;
  // initOpts = {
  //   height: 600
  // };
  private zc: any = zc;
  url  = 'https://robo-advisor-back.herokuapp.com';
  // url  = 'http://localhost:3000';

  profile: any;
  actions:Array<string>=[] ;


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
    this.chargeBar()

    this._reponseService.getPerformanceByUser(this.profile)
    .subscribe(res => {
      // console.log(res);
      this.chargeLine(res);
      // this.createEchart(res);
    });

    // this.getserie(this.profile);
    // this.getserie(this.profile)
  }

  chargeDash() {
    const PieChart = this.zc.PieChart;
    const chart = new PieChart({
      area:{height:350},
      title:{text:"Portfeuille"},
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
      enabled: false,
      numberOfColumns: 2,
      equalizeRowsColumns: false, // entries in the next row or column will split by one
      marker: {shape: 'circle', size: 30}
    },
    pie: {
      innerRadius: 0,
      style:{sliceColors:["#ff874f","#36855F","#FB7D30","#E73431","#884BBC","#09C9AC","#529BBC","#529B44"] },

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

  chargeBar() {
    const FacetChart = this.zc.FacetChart;
    const chart = new FacetChart({
    container: document.getElementById('chartBarChart'),
    interaction: {resizing:{enabled:false},mode:"select"},
    area:{height:350},
    style: {
      // columnColors:[ "#ff8222", "#36BEFF", "#FBBD30", "#EE3431", "#894BBC", "#0EC9AC", "#524BBC" ]
    },
    series: [
            {
                name: "",
                style: {
                    depth:10,
                    fillColor: "#36BEFF"
                }
            }
        ],
        toolbar: {
            fullscreen: true,
            enabled: true
        },
    data: { url: this.url + '/api/secteur/' + this.profile },
    title:{text:"Secteurs"},
  });
  }

  chargeLine(res){


    const TimeChart = this.zc.TimeChart;
    const chart = new TimeChart ({
        title:{text:"Performance des Actifs"},
        area:{height:500},
        container: document.getElementById("chartLineChart"),
        navigation : {
          initialDisplayUnit: 'd'
         },
        legend: {
          enabled: true
        },
        series:res.serie,
        data:
        {
            units: ['d'],
            // timestampInSeconds: true,
            preloaded: res.data
        }
    });
  }

  // createEchart(res) {
  //   console.log(res)
  //   console.log("res")
  //   this.chartOption = {
  //     title: {
  //        text: 'Performance',
  //    },
  //     tooltip: {
  //        trigger: 'axis'
  //    },
  //    legend: {
  //        data:['tt','bb']
  //    },

  //    dataZoom: [{
  //        type: 'inside',
  //        start: 0,
  //        end: 100
  //    }, {
  //        start: 0,
  //        end: 10,
  //        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
  //        handleSize: '80%',
  //        handleStyle: {
  //            color: '#fff',
  //            shadowBlur: 3,
  //            shadowColor: 'rgba(0, 0, 0, 0.6)',
  //            shadowOffsetX: 2,
  //            shadowOffsetY: 2
  //        }
  //    }],
  //      xAxis: {
  //          type: 'category',
  //          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  //      },
  //      yAxis: {
  //          type: 'value'
  //      },
  //      series: [
  //        {
  //          data: [820, 932, 901, 934, 1290, 1330, 1320],
  //          type: 'line',
  //          name:'tt',
  //      },
  //      {
  //        data: [10, 20, 30, null, 10, 88, 1320],
  //        type: 'line',
  //        name:'bb',
  //    }
  //    ]
  //  };

  // }


    // var act = this._reponseService.getActionbyuser(id);
    // this.createEchartAfricain();


  // }



}
