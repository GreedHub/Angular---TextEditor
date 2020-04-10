import { Injectable } from '@angular/core';
import { ServiceConfig } from './service-config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Synonym } from '../models/Synonym';

@Injectable({
  providedIn: 'root'
})
export class DatamuseService extends ServiceConfig{

  constructor(private http:HttpClient) {super();}

  getSynonyms(word:String):Observable<Synonym[]>{

    this.service_config.service = 'words';
    
    let params = new HttpParams()
    .set('ml', word.toString());

    let url = `${this.service_config.host}/${this.service_config.service}`;

    return this.http.get<Synonym[]>(url,{
      headers: this.headers,
      params,
      withCredentials: !this.service_config.host.includes("localhost"),
      }
    );

  }



}
