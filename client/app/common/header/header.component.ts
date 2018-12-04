import { Component, OnInit } from "@angular/core";
import { LoginService } from "client/app/core/http";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginService.isLoggedIn().subscribe(
      data => {
        if (data['success'] === "true") {
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
