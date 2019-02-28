import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LoginService implements OnInit {
  headers = new HttpHeaders().append("Content-Type", "application/json");

  private _url = "http://localhost:3000/user/signin/";

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  login(userName: string, password: string) {
    return this.http.post(
      this._url,
      { userName: userName, password: password },
      {
        observe: "body",
        withCredentials: true,
        headers: this.headers
      }
    );
  }

  logout() {
    return this.http.get("http://localhost:3000/user/signout", {
      observe: "body",
      withCredentials: true,
      headers: this.headers
    });
  }
}
