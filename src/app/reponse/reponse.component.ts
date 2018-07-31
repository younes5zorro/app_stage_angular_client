import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ReponseService } from '../reponse.service';
import { Reponse } from '../reponse';
@Component({
  selector: 'app-reponse',
  templateUrl: './reponse.component.html',
  styleUrls: ['./reponse.component.css']
})
export class ReponseComponent implements OnInit {
  reponse: Array<Reponse>;
  constructor(private _reponseService: ReponseService, private router: Router, private aR: ActivatedRoute) { }

  ngOnInit() {
    this.aR.params.subscribe((params) => {
      let id: any = params['id'];

      this._reponseService.getReponse(id)
        .subscribe(res => this.reponse = res);
    });
  }

}
