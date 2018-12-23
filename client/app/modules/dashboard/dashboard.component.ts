import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

import { UserService } from "../../core/http";
import { AlertService } from "../../core/services";
import { User } from "../../shared/models";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  profileForm: FormGroup;
  profile: User;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.profileForm = this.formBuilder.group({
      name: this.formBuilder.control({ value: "", disabled: true }),
      userName: this.formBuilder.control({ value: "", disabled: true }),
      email: this.formBuilder.control({ value: "", disabled: true })
    });
  }

  ngOnInit() {
    this.userService.showProfile().subscribe(
      data => {
        this.profileForm.setValue({
          name: data["name"],
          userName: data["userName"],
          email: data["email"]
        });
      },
      err => {
        if (err.error["error"]) {
          console.log(err.error);
          this.removeLocalStorage();
          this.router.navigate(["login"]);
        }
      }
    );
  }

  onEditProfile() {
    this.router.navigate(["edit"], { relativeTo: this.activatedRoute });
  }

  onChangePassword() {
    this.router.navigate(["change-password"], {
      relativeTo: this.activatedRoute
    });
  }

  onDeleteProfile() {
    this.userService.deleteProfile().subscribe(
      data => {
        this.removeLocalStorage();
        this.alertService.success(data["success"]);
        setTimeout(() => {
          this.router.navigate(["login"]);
        }, 2000);
      },
      err => {
        this.alertService.error(err.error["error"]);
        this.removeLocalStorage();
        setTimeout(() => {
          this.router.navigate(["login"]);
        }, 2000);
      }
    );
  }

  removeLocalStorage() {
    localStorage.removeItem("x-auth");
  }
}
