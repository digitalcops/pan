import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class InitialAuthGuard implements CanActivate {

    constructor(
        readonly router: Router
    ) { }

    canActivate(): boolean {
        if (localStorage.getItem('loggedInUser')) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }

}
