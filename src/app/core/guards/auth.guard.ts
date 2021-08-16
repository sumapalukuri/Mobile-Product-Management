import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem("isAdminLoggedIn") === "logged In") {
        return true;
      } else {
        this.toastr.error("You are currently not logged in, please Login to the app", '', {
          timeOut: 4000, positionClass: 'toast-top-center'
        })
        this.router.navigate( ["/login"] );
        return false
      }
  }
  
}
