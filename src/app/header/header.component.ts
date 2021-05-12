import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../oidc-service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  toggle() {
    this.sidenavToggle.emit(null);
  }

  constructor(private authService: AuthService) {}
  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
