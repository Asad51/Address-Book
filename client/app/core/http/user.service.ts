import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  showProfile() {
    return this.http.get("http://localhost:3000/user/dashboard", {
      observe: "body",
      withCredentials: true,
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }

  updateProfile(name: string, userName: string, email: string) {
    return this.http.put(
      "http://localhost:3000/user/dashboard",
      { name: name, userName: userName, email: email },
      {
        observe: "body",
        withCredentials: true,
        headers: new HttpHeaders().append("Content-Type", "application/json")
      }
    );
  }

  changePassword(oldPassword: string, newPassword: string, confirmPassword: string){

  }

  deleteProfile(){
    return this.http.delete(
      "http://localhost:3000/user/dashboard",
      {
        observe: "body",
        withCredentials: true,
        headers: new HttpHeaders().append("Content-Type", "application/json")
      }
    );
  }
}
