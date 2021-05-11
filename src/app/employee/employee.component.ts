import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClientService, Employee } from '../service/httpclient.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[];
  displayedColumns: string[] = ['name', 'designation', 'delete'];

  constructor(
    private httpClientService: HttpClientService,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.httpClientService
      .getEmployees()
      .subscribe(response => this.handleSuccessfulResponse(response));
  }

  handleSuccessfulResponse(response) {
    this.employees = response;
  }

  deleteEmployee(employee: Employee): void {
    this.httpClientService.deleteEmployee(employee).subscribe(data => {
      this.employees = this.employees.filter(u => u !== employee);
    });
  }

  hasUserPermissionToDelete(): boolean {
    return this.authenticationService.userPermissions() ?
      this.authenticationService.userPermissions().includes('user.delete') :
      false; 
  }
}
