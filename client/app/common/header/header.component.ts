import { Component, OnInit } from "@angular/core";
import { LoginService } from "client/app/core/http";
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
    private router: Router
  ) {}

  ngOnInit() {
    setInterval(()=>{
      if(this.loginService.isLoggedIn()){
        this.isLoggedIn = true;
      }
      else{
        this.isLoggedIn = false;
      }
    }, 1000);
  }

  onLogout(){
    this.loginService.logout().subscribe((data)=>{
      console.log(data);
    });
    this.loginService.checkLogin();
    this.router.navigate(['/login']);
  }

}
