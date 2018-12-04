import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _url = "http://localhost:3000/contacts";

  constructor( private http: HttpClient) { }

  addContact(contact: Contact){
    return this.http.post(this._url, contact, {
      observe: "body",
      withCredentials: true,
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }
}
