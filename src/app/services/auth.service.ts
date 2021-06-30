import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private userData: any; // Save logged in user data

  constructor(public afAuth: AngularFireAuth, public router: Router) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    // this.afAuth.authState.subscribe((user) => {
    //   console.log('auth state', user);
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     console.log('print');
    //   } else {
    //     localStorage.setItem('user', 'null');
    //   }
    // });
  }

  // Sign in with email/password
  login(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.user));
        // this.userData = resp.user;
        return resp;
      });
  }

  // Sign up with email/password
  register(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Sign out
  logout() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user != null;
  }

  get userDetails() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }
}
