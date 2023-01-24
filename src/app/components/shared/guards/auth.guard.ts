import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginService } from '../../../services/login.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: LoginService, private readonly router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //console.log(this.authService.verifyToken())
    return this.authService.verifyToken()
      .pipe(
        tap((isAuthenticated) => {
        if (!isAuthenticated) this.router.navigate(['login'])
      }));
  }
}