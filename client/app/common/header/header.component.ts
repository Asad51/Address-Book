import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { LoginService } from "../../core/http";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  constructor(public loginService: LoginService, private router: Router) {}

  onLogout() {
    this.loginService.logout().subscribe(data => {
      this.loginService.checkLogin();
      this.router.navigate(["login"]);
    });
  }
}
