import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authenticationService: AuthenticationService) {}
  opened: boolean = false;

  sidenavToggle() {
    return (this.opened = !this.opened);
  }
}
