import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './oidc-service/auth.service';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated: Observable<boolean>;
  isDoneLoading: Observable<boolean>;
  canActivateProtectedRoutes: Observable<boolean>;

  constructor(
    private authenticationService: AuthenticationService,
    private authService: AuthService
  ) {
    this.isAuthenticated = this.authService.isAuthenticated$;
    this.isDoneLoading = this.authService.isDoneLoading$;
    this.canActivateProtectedRoutes = this.authService.canActivateProtectedRoutes$;

    this.authService.runInitialLoginSequence();
  }
  opened: boolean = false;

  sidenavToggle() {
    return (this.opened = !this.opened);
  }
}
