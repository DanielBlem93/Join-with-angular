import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";

import { PanelHeaderComponent } from "../panel-header/panel-header.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  constructor() {

  }

  generateGreeting() {
    const date = new Date();
    const hour = date.getHours();
    let greeting;
    if (hour >= 5 && hour < 12) greeting = "Good morning,";
    else if (hour >= 12 && hour < 18) greeting = "Good afternoon,";
    else if (hour >= 18 && hour < 22) greeting = "Good evening,";
    else greeting = "Good night,";
    return greeting
  }

}
