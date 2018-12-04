import { Component, OnInit } from "@angular/core";
import { UserService } from "../../core/http";
import { AlertService } from '../../core/services';
import { User } from "../../shared/models";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  profile: User;
  constructor(private userService: UserService, private alertService: AlertService, private router: Router) {}

  ngOnInit() {
    this.userService.showProfile().subscribe(
      (data) => {
        console.log(data);
      },
      (err)=>{
        this.alertService.error(err.error);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }
    )
  }

}
