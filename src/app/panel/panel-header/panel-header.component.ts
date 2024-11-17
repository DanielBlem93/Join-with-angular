import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-panel-header',
  standalone: true,
  imports: [],
  templateUrl: './panel-header.component.html',
  styleUrl: './panel-header.component.scss'
})
export class PanelHeaderComponent {

  constructor(public authService: AuthenticationService) {

  }

}
