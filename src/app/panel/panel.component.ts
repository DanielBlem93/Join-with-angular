import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { PanelHeaderComponent } from "./panel-header/panel-header.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SummaryComponent } from "./summary/summary.component";
import { BoardComponent } from "./board/board.component";
import { AddTaskComponent } from "./add-task/add-task.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { LegalNoticeComponent } from "./legal-notice/legal-notice.component";
import { AuthenticationService } from '../services/authentication.service';
import { HelpersService } from '../services/helpers.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [NavbarComponent, PanelHeaderComponent, SummaryComponent, CommonModule, BoardComponent, AddTaskComponent, ContactsComponent, LegalNoticeComponent],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent implements OnInit {

  constructor(public router: Router,
    public authService: AuthenticationService,
    private helpers: HelpersService
  ) {

  }
  ngOnInit(): void {
    this.hasLogIn()
  }

  hasLogIn() {
    if (!this.authService.auth.currentUser) {
      this.helpers.redirectTo('/login', 0)
    }
  }

}
