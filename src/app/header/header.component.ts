import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

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

  constructor(private loginService: AuthenticationService) {}
  ngOnInit() {}
}
