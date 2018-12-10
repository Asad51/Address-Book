import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs'

import { LoginService } from "../http";

@Injectable({
  providedIn: "root"
})
export class NoAuthService implements CanActivate {
  
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    let checkLogin;
    let promise = new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(this.loginService.isLoggedIn);
      }, 200);
    });

    return promise.then((isLoggedIn)=>{
      if(isLoggedIn)
      {
        checkLogin = false;
        this.router.navigate(['dashboard'])
      }
      else{
        checkLogin = true;
      }
      return checkLogin;
    });
  }
}
