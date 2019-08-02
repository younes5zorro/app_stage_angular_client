import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Reponse } from './reponse';

@Injectable()
export class ReponseService {

  result: any;

  // url = 'https://robo-advisor-back.herokuapp.com';
  url = 'http://localhost:3000';

  constructor(private _http: Http) { }

  getReponses() {
    return this._http.get(this.url + '/api/all').pipe(map(result => this.result = result.json()));
  }
  getForDash() {
    return this._http.get(this.url + '/api/dash').pipe(map(result => this.result = result.json()));
  }
  getForCard(slug) {
    return this._http.get(this.url + '/api/card/' + slug).pipe(map(result => this.result = result.json()));
  }
  getTweets(slug) {
    return this._http.get(this.url + '/api/tweets/' + slug).pipe(map(result => this.result = result.json()));
  }

  getCalculs(slug) {
    return this._http.get(this.url + '/api/rows2/' + slug).pipe(map(result => this.result = result.json()));
  }
  getActions() {
    return this._http.get(this.url + '/api/actions').pipe(map(result => this.result = result.json()));
  }
  getReponse(id) {
    return this._http.get(this.url + '/api/reponse/' + id)
      .pipe(map(result => this.result = result.json()));
  }
  delete_Reponse(id) {
    return this._http.get(this.url + '/api/delete_reponse/' + id)
      .pipe(map(result => this.result = result.json()));
  }

  update_montant_Reponse(post) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this.url + '/api/update', JSON.stringify(post), options)
      .pipe(map(result => this.result = result.json()));
  }

  insertReponse(post: Reponse) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    return this._http.post(this.url + '/api/create', JSON.stringify(post), options)
      .pipe(map(result => this.result = result.json()));
  }
  getActionbyuser(id) {
    return this._http.get(this.url + '/api/useraction/' + id)
      .pipe(map(result => this.result = result.json()));
  }
}
