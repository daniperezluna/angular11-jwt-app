import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  @Input() error: string | null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginservice: AuthenticationService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    return this.loginservice.isUserLoggedIn()
      ? this.router.navigate([''])
      : ' ';
  }

  onSubmit() {
    if (this.form.valid) {
      const credentials = this.form.value;

      this.loginservice.login(credentials).subscribe(
        () => {
          this.router.navigate(['']);
        },
        error => {
          this.error = error.statusText;
        }
      );
    }
  }
}
