import { Component, OnInit } from '@angular/core';

import { ReponseService } from '../reponse.service';
import { Reponse } from '../reponse';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  reponses: Array<Reponse>;
  titre: String;

  constructor(private _reponseService: ReponseService) { }

  ngOnInit() {
    this._reponseService.getReponses()
    .subscribe(res => this.reponses = res);
  }

}
