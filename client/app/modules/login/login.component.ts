import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { User } from '../../shared/models';
import { AlertService } from 'client/app/core/services';
import { Router } from '@angular/router';
import { LoginService } from 'client/app/core/http';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    userName: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor( private fb: FormBuilder, 
    private loginService: LoginService, 
    private alertService: AlertService, 
    private router: Router 
  ) { }

  ngOnInit() {
  }

  get userName() { return this.loginForm.get('userName'); }
  get password() { return this.loginForm.get('password'); }

  onLoginFormSubmit(){
    if(this.loginForm.invalid){
      return;
    }

    this.loginService.login(this.userName.value, this.password.value)
      .pipe(first())
      .subscribe(
        (data)=>{
          for (let d of Object.keys(data)) {
            this.alertService.success(data[d]);
          }
          setTimeout(() => {
             this.router.navigate(["/dashboard"]);
          }, 2000);
        },
        (err) =>{
          this.alertService.error(err.error);
          console.log(err.error);
          this.router.navigate(["/login"]);
        }
      )
  }

}
