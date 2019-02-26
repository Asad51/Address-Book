import { ToastrService } from "ngx-toastr";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

import { AlertService } from "../../core/services";
import { LoginService } from "../../core/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private alertService: AlertService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ["", [Validators.required, Validators.minLength(4)]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  onLoginFormSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService
      .login(this.userName.value, this.password.value)
      .pipe(first())
      .subscribe(
        async data => {
          this.toastr.success(data["success"]);
          localStorage.setItem("x-auth", data["token"]);
          this.router.navigate(["dashboard"]);
        },
        err => {
          if (err.error["error"]) {
            this.toastr.error(
              err.error["error"] ||
                "Something Went Wrong. Please Try Again Later."
            );
          }
        }
      );
  }

  get userName() {
    return this.loginForm.get("userName");
  }
  get password() {
    return this.loginForm.get("password");
  }
}
