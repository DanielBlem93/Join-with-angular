import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";

import { PanelHeaderComponent } from "../panel-header/panel-header.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [NavbarComponent,PanelHeaderComponent, RouterLink],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

}
