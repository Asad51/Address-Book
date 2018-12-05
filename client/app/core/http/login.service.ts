import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoginService implements OnInit {
  headers = new HttpHeaders().append("Content-Type", "application/json");

  loggedIn: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  checkLogin() {
    this.http
      .get<any>("http://localhost:3000/user/signin", {
        observe: "body",
        withCredentials: true,
        headers: this.headers
      }).subscribe(
        (data)=>{
          if(data['success']){
            this.loggedIn = true;
          }
        },
        (err)=>{
          this.loggedIn = false;
        }
      )
  }

  isLoggedIn(){
    return this.loggedIn;
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
