import { Component } from "@angular/core";
import { LoginService } from "../../core/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  constructor(public loginService: LoginService) {}
}
