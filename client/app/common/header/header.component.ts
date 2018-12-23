import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { LoginService } from "../../core/http";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  isLoggedIn() {
    if (localStorage.getItem("x-auth")) {
      return true;
    }
    return false;
  }

  onLogout() {
    this.loginService.logout().subscribe(data => {
      localStorage.removeItem("x-auth");
      this.router.navigate(["login"]);
    });
  }
}
