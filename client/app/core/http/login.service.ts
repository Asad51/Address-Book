import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoginService implements OnInit {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().append("Content-Type", "application/json");
  ngOnInit() {
  }

  isLoggedIn() : Observable<any> {
    return this.http
      .get<any>("http://localhost:3000/user/signin", {
        observe: "body",
        withCredentials: true,
        headers: this.headers
      });
  }

  login(userName: string, password: string) {
    return this.http.post(
      "http://localhost:3000/user/signin",
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
