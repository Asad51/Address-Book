import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

import { AlertService } from "../../../core/services";
import { UserService } from "../../../core/http";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"]
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.editProfileForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
      userName: ["", [Validators.required, Validators.minLength(4)]],
      email: ["", [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.userService.showProfile().subscribe(
      data => {
        this.editProfileForm.setValue({
          name: data["name"],
          userName: data["userName"],
          email: data["email"]
        });
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

  onEditProfileFormSubmit() {
    if (!this.editProfileForm.valid) {
      return;
    }
    this.userService
      .updateProfile(this.name.value, this.userName.value, this.email.value)
      .subscribe(
        data => {
          this.alertService.success(data["success"]);
          this.editProfileForm.reset();
          setTimeout(() => {
            this.router.navigate(["../"], { relativeTo: this.activatedRoute });
          }, 1000);
        },
        err => {
          this.alertService.error(err.error["error"]);
        }
      );
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.activatedRoute });
  }

  get name() {
    return this.editProfileForm.get("name");
  }

  get userName() {
    return this.editProfileForm.get("userName");
  }

  get email() {
    return this.editProfileForm.get("email");
  }
}
