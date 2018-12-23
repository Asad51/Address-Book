import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class NoAuthService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem("x-auth")) {
      this.router.navigate(["dashboard"]);
      return false;
    }
    return true;
  }
}
