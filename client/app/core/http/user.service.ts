import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private _url = "user/dashboard/";
  constructor(private http: HttpClient, private router: Router) {}

  showProfile() {
    return this.http.get(this._url, {
      observe: "body",
      withCredentials: true,
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }

  updateProfile(name: string, userName: string, email: string) {
    return this.http.put(
      this._url,
      { name: name, userName: userName, email: email },
      {
        observe: "body",
        withCredentials: true,
        headers: new HttpHeaders().append("Content-Type", "application/json")
      }
    );
  }

  changePassword(
    oldPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    return this.http.put(
      this._url + "password",
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
      },
      {
        observe: "body",
        withCredentials: true,
        headers: new HttpHeaders().append("Content-Type", "application/json")
      }
    );
  }

  deleteProfile() {
    return this.http.delete(this._url, {
      observe: "body",
      withCredentials: true,
      headers: new HttpHeaders().append("Content-Type", "application/json")
    });
  }
}
