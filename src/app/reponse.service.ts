import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Reponse } from './reponse';

@Injectable()
export class ReponseService {

  result: any;

  constructor(private _http: Http) { }

  getReponses() {
    return this._http.get('http://localhost:3000/api/all').pipe(map(result => this.result = result.json()));
  }
  getReponse(id) {
    return this._http.get('http://localhost:3000/api/reponse/' + id)
      .pipe(map(result => this.result = result.json()));
  }

  insertReponse(post: Reponse) {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    console.log(post);
    return this._http.post('http://localhost:3000/api/create', JSON.stringify(post), options)
      .pipe(map(result => this.result = result.json()));
  }
}
