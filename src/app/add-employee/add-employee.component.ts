import { Component, OnInit } from '@angular/core';
import { HttpClientService, Employee } from '../service/httpclient.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
  user: Employee = new Employee('', '', '', '');

  constructor(
    private fb: FormBuilder,
    private httpClientService: HttpClientService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      unit: ['', Validators.required],
      id: ['', Validators.required]
    });
  }

  ngOnInit() {}

  createEmployee(): void {
    if (this.form.valid) {
      this.user = this.form.value;
      this.httpClientService.createEmployee(this.user).subscribe(
        data => {
          alert('Employee created successfully.');
          this.router.navigate(['']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  hasUserPermissionToAdd(): boolean {
    return this.authenticationService.userPermissions()
      ? this.authenticationService.userPermissions().includes('user.add')
      : false;
  }
}
