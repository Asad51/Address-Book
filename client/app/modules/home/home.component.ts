import { Component, OnInit } from "@angular/core";
import { LoginService } from "client/app/core/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public isLoggedIn: Boolean = false;
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    if (this.loginService.isLoggedIn()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
}
