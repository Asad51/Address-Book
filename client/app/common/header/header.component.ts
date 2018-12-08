import { Component } from "@angular/core";
import { LoginService } from "client/app/core/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {

  constructor(
    public loginService: LoginService,
    private router: Router
  ) {}

  onLogout(){
    this.loginService.logout().subscribe((data)=>{
      this.loginService.checkLogin();
      this.router.navigate(['/login']);
      console.log(data);
    });
  }
}
