import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticateService } from './authenticate.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthGuardGuard implements CanActivate {

  constructor(
    public authService: AuthenticateService,
    public router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     let retValue = false; 
    if (localStorage.getItem('loggedInUser')) {
      retValue = true;
    } else {
      this.router.navigate(['/login']);
    }
    return retValue;
}
}
