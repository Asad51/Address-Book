import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LoginService implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  isLoggedIn() {
    return this.http
      .get("http://localhost:3000/user/signin", {
        observe: "body",
        withCredentials: true
      });
  }

  login(userName: string, password: string) {
    return this.http.post(
      "http://localhost:3000/user/signin",
      { userName: userName, password: password },
      {
        observe: "body",
        withCredentials: true,
        headers: new HttpHeaders().append("Content-Type", "application/json")
      }
    );
  }

  logout() {
    return this.http.get("http://localhost:3000/user/signout", {
      observe: "body",
      withCredentials: true,
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }
}
