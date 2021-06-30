import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { delay, filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

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

  register(email: string, password: string) {
    from(this.authService.register(email, password))
      .pipe(delay(2000))
      .subscribe(
        (res) => {
          // navigate to dashboard
          this.router.navigate(['dashboard/students']);
        },
        (err) => {
          this.error = err.message;
        }
      );
  }
}
