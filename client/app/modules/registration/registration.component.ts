import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

import { RegisterService, LoginService } from "../../core/http";
import { AlertService } from "../../core/services";
import { PasswordValidation } from "./password-validation";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private alertService: AlertService,
    private router: Router,
    private loginService: LoginService
  ) {
    if(loginService.isLoggedIn){
      router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        name: ["", [Validators.required, Validators.minLength(4)]],
        userName: ["", [Validators.required, Validators.minLength(4)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(6)]]
      },
      {
        validator: PasswordValidation.MatchPassword
      }
    );
  }

  get name() {
    return this.registrationForm.get("name");
  }
  get userName() {
    return this.registrationForm.get("userName");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get password() {
    return this.registrationForm.get("password");
  }
  get confirmPassword() {
    return this.registrationForm.get("confirmPassword");
  }

  onRegistrationFormSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }

    this.registerService
      .register(
        this.name.value,
        this.userName.value,
        this.email.value,
        this.password.value,
        this.confirmPassword.value
      )
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success(data["success"]);
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 2000);
        },
        err => {
          this.alertService.error(err.error["error"]);
          this.router.navigate(["/register"]);
        }
      );
  }
}
