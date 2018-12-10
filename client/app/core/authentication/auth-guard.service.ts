import { Injectable } from "@angular/core";
import { CanActivate, Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { LoginService } from "../http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let checkLogin;
    let promise = new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(this.loginService.isLoggedIn);
      }, 200);
    });

    return promise.then((isLoggedIn)=>{
      if(isLoggedIn)
      {
        checkLogin = true;
      }
      else{
        this.router.navigate(['login']);
        checkLogin = false;
      }
      return checkLogin;
    });
  }

  canActivateChild(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot): Promise<boolean> | boolean{
    let checkLogin;
    let promise = new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(this.loginService.isLoggedIn);
      }, 200);
    });

    return promise.then((isLoggedIn)=>{
      if(isLoggedIn)
      {
        checkLogin = true;
      }
      else{
        checkLogin = false;
      }
      return checkLogin;
    });
  }
}
