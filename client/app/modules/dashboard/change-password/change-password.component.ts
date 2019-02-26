import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { PasswordValidator } from "./password-validator";
import { AlertService } from "../../../core/services";
import { UserService } from "../../../core/http";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group(
      {
        oldPassword: ["", [Validators.required, Validators.minLength(6)]],
        newPassword: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(6)]]
      },
      {
        validator: PasswordValidator.MatchPassword
      }
    );
  }

  onChangePasswordFormSubmit() {
    if (!this.changePasswordForm.valid) {
      return;
    }
    this.userService
      .changePassword(
        this.oldPassword.value,
        this.newPassword.value,
        this.confirmPassword.value
      )
      .subscribe(
        data => {
          this.toastr.success(data["success"]);
          this.changePasswordForm.reset();
          setTimeout(() => {
            this.router.navigate(["../"], { relativeTo: this.activatedRoute });
          }, 1000);
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

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.activatedRoute });
  }

  get oldPassword() {
    return this.changePasswordForm.get("oldPassword");
  }

  get newPassword() {
    return this.changePasswordForm.get("newPassword");
  }

  get confirmPassword() {
    return this.changePasswordForm.get("confirmPassword");
  }
}
