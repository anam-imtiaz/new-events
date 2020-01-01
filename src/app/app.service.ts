import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {User, IUserResponse} from './user';

const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const requestOptions = {                                                                                                                                                                                 
  headers: new Headers(headerDict), 
};

@Injectable()
export class AppService {



  constructor(private http: HttpClient) {}



  get_artist_info(artist_name){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      }),
    };
    return this.http.get('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&api_key=a427fee5189e753e3fd04178426a6511&artist='+artist_name+'&format=json',httpOptions)
  }

  get_artist_events(artist_name){
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      }),
    };
    return this.http.get(' http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&api_key=a427fee5189e753e3fd04178426a6511&artist='+artist_name+'&format=json',httpOptions)
  }
}
