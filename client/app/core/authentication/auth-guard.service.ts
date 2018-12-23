import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem("x-auth")) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }

  canActivateChild(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem("x-auth")) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
}
