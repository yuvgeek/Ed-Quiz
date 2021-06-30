import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { delay, filter, switchMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {}

  form: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(''),
  });

  error: string = '';

  ngOnInit() {
    this.form.valueChanges
      .pipe(filter(() => !!this.error))
      .subscribe(() => (this.error = ''));
  }

  login(email: string, password: string) {
    this.authService.login(email, password).then((resp) => {

      console.log('then', resp);
      this.router.navigate(['dashboard/students']);
    });

    // from(this.authService.login(email, password))
    //   // .pipe(delay(2000))
    //   .subscribe(
    //     (res) => {
    //       // navigate to dashboard
    //       this.router.navigate(['dashboard/students']);
    //     },
    //     (err) => {
    //       this.error = err.message;
    //     }
    //   );
  }
}
