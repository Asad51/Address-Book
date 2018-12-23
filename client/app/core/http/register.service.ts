import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(
    name: string,
    userName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    return this.http.post("user/signup", {
      name: name,
      userName: userName,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    });
  }
}
