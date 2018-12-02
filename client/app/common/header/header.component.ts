import { Component, OnInit } from "@angular/core";
import { LoginService } from "client/app/core/http";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private loginService: LoginService
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
