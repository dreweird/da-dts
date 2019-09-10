import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private BASE_URL = 'http://172.16.130.10:4001';

  constructor(private http: HttpClient,) { }

  addDoc(doc:any, tracking_number:any, draft_final: Number){
    const url = `${this.BASE_URL}/addDoc`;
    var token = localStorage.getItem("token");
    return this.http.post<any>(url, {doc,tracking_number,draft_final,token} );
  }

  getDoc(tracking_number:any){
    const url = `${this.BASE_URL}/getDoc`;
    var token = localStorage.getItem("token");
    return this.http.post<any>(url, {tracking_number,token} );
  }
}
