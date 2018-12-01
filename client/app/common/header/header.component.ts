import { Component, OnInit } from "@angular/core";
import { LoginService, UserService } from "client/app/core/http";
import { AlertService } from "client/app/core/services";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private loginService: LoginService,
    private alertService: AlertService,
    private userService: UserService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loginService.isLoggedIn().subscribe(
      data => {
        if (data === "true") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      err => {
        this.isLoggedIn = false;
      }
    );
  }
}
