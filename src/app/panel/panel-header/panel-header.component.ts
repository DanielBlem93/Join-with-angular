import { Component, ElementRef, HostListener } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-panel-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panel-header.component.html',
  styleUrl: './panel-header.component.scss'
})
export class PanelHeaderComponent {


  logoutMenu = false;
  constructor(public authService: AuthenticationService,
    private elRef: ElementRef,
    public helpers: HelpersService
  ) {
    
  }


  toggleLogoutMenu() {
    this.logoutMenu = !this.logoutMenu;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const targetElement = event.target as HTMLElement;
    if (this.logoutMenu && !this.elRef.nativeElement.contains(targetElement)) {
      this.logoutMenu = false;
    }
  }
}
