import { Component, OnInit } from '@angular/core';
import { User } from './../user'
import {FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {AppService} from './../app.service';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import {Observable} from 'rxjs'
import {MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatButtonModule, MatProgressSpinnerModule} from '@angular/material';

import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filteredUsers: User[] = [];
  usersForm: FormGroup;
  isLoading = false;
  searchArtistCtrl = new FormControl();
  filteredArtists: any;
  artist_details = '';
  event_details : any
  errorMsg: string;
  
  constructor(private fb: FormBuilder, private appService: AppService,private http: HttpClient) {}s
  ngOnInit() {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
      }),
    };
    this.searchArtistCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = "";
          this.filteredArtists = [];
          this.isLoading = true;
        }),
        switchMap(value => this.http.get("http://ws.audioscrobbler.com/2.0/?method=artist.search&api_key=a427fee5189e753e3fd04178426a6511&artist="+value+"&format=json",httpOptions)
          .pipe(
            finalize(() => {
              this.isLoading = false
            }),
          )
        )
      )
      .subscribe(data => {
        if (data['results'] == undefined) {
          this.errorMsg = 'No Record Found';
          this.filteredArtists = [];
        } else {
          this.errorMsg = "";
          let name_array =  data['results']['artistmatches']['artist'];
          name_array.forEach(element => {
            //console.log(element.name);
            this.filteredArtists.push(element.name);
          });
        }
      });
  }

  displayFn(user: User) {
    if (user) { return user; }
  }

  get_artist_info(artist_name){
     this.appService.get_artist_info(artist_name).subscribe(result =>{
        this.artist_details = result['artist'];
         this.appService.get_artist_events(artist_name).subscribe(events =>{
           this.event_details = events['topalbums']['album'];
                
         });
     });
  }

}
