import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { UserService } from './user.service';
import { map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';

@Injectable()
export class NoAuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    this.userService.isAuthenticated.subscribe(
      result => {
        if(result)
          this.router.navigateByUrl('/')
      }
    );

    return this.userService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));

  }
}