import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthResolver implements Resolve<boolean> {
  constructor(private angularFireAuth: AngularFireAuth) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // return new Promise((resolve, reject) => {
    //   this.angularFireAuth.authState.toPromise().then(() => resolve(true));
    // });
    return true;
  }
}
