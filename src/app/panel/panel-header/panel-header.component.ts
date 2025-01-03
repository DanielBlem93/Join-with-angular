import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-header.component.html',
  styleUrl: './panel-header.component.scss'
})
export class PanelHeaderComponent {


  logoutMenu = false;
  constructor(public authService: AuthenticationService) {

  }


  toggleLogoutMenu() {
    this.logoutMenu = !this.logoutMenu;
  }
}
