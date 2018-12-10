import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  private _url = "http://localhost:3000/contacts/";
  private options: Object = {
    observe: "body",
    withCredentials: true,
    headers: new HttpHeaders().append("Content-Type", "application/json")
  };

  constructor(private http: HttpClient) {}

  addContact(contact) {
    return this.http.post(this._url, contact, this.options);
  }

  updateContact(id: string, contact) {
    return this.http.put(this._url + id, contact, this.options);
  }

  deleteContact(id: string) {
    return this.http.delete(this._url + id, this.options);
  }

  getContact(id: string) {
    return this.http.get(this._url + id, this.options);
  }

  showAllContacts() {
    return this.http.get(this._url, this.options);
  }

  downloadContacts() {
    return this.http.get(this._url + "download", {
      observe: "body",
      withCredentials: true,
      responseType: "blob",
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }
}
