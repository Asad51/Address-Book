import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { LoginService } from "./login.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
  ) {}

  showProfile() {
    if (!this.loginService.isLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      return this.http.get("http://localhost:3000/user/dashboard", {
        observe: "body",
        withCredentials: true,
        headers: new HttpHeaders().append("Content-Type", "application/json")
      });
    }
  }
}
