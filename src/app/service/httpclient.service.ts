import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import employeesData from '../../assets/employees.json';
import { of } from 'rxjs';
import { Observable } from 'rxjs/dist/types';

export class Employee {
  constructor(
    public id: string,
    public full_name: string,
    public unit: string,
    public salary: string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private _employees = employeesData;
  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<Employee> {
    return of(this._employees);
  }

  public deleteEmployee(employee) {
    return this.httpClient.delete<Employee>(
      'http://localhost:8080/employees' + '/' + employee.empId
    );
  }

  public createEmployee(employee) {
    return this.httpClient.post<Employee>(
      'http://localhost:8080/employees',
      employee
    );
  }
}
