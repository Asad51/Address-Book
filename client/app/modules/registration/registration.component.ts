import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

import { RegisterService } from "../../core/http";
import { AlertService } from "../../core/services";
import { PasswordValidation } from './password-validation';

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        name: ["", [Validators.required, Validators.minLength(4)]],
        userName: ["", [Validators.required, Validators.minLength(4)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(6)]]
      }, {
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
    this.submitted = true;
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
          for (let d of Object.keys(data)) {
            this.alertService.success(data[d]);
          }
          setTimeout(() => {
            this.router.navigate(["/login"]);
          }, 2000);
        },
        err => {
          this.alertService.error(err.error);
          this.router.navigate(["/register"]);
        }
      );
  }
}
