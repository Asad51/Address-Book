import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { LoginService } from '../http';

@Injectable({
  providedIn: 'root'
})
export class NoAuthService implements CanActivate {

  constructor( private loginService: LoginService, private router: Router) {
  }

  canActivate() {
    if(this.loginService.isLoggedIn){
      this.router.navigate(['dashboard']);
      return false;
    }
    return true;
  }
}
