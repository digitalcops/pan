import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthenticateGuard implements CanActivate {

    constructor(
        public router: Router
    ) { }

    canActivate(): boolean {
        const url = window.location.pathname;
        if (localStorage.getItem('loggedInUser')) {
            this.router.navigate([url]);
            return false;
        } else {
            return true;
        }
    }

}
