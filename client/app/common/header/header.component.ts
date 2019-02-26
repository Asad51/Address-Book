import { ToastrService } from "ngx-toastr";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { LoginService } from "../../core/http";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  isLoggedIn() {
    if (localStorage.getItem("x-auth")) {
      return true;
    }
    return false;
  }

  onLogout() {
    this.loginService.logout().subscribe(
      data => {
        this.toastr.info(data["success"] || "Successfully Logout.");
        localStorage.removeItem("x-auth");
        this.router.navigate(["login"]);
      },
      err => {
        this.toastr.error(
          err.error["notLoggedIn"] ||
            err.error["error"] ||
            "Something went wrong."
        );
        if (err.error["notLoggedIn"]) {
          localStorage.removeItem("x-auth");
          this.router.navigate(["login"]);
        }
      }
    );
  }
}
