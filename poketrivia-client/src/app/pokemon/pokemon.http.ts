import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PokemonHttp {

  constructor(
    private http: HttpClient
  ) { }

  fetchAll(): Observable<any> {
    return this.http.get('/pokemon');
  }

}
