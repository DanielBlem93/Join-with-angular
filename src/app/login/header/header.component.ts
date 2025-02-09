import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { introAnimation } from '../../animations/intro.animation';
import { ResponsiveService } from '../../services/responsive.service';
import { NotAJoinUserComponent } from "./not-ajoin-user/not-ajoin-user.component";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, NotAJoinUserComponent,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [introAnimation]
})
export class HeaderComponent implements OnInit, OnDestroy {
  backGroundAnimation = true;
  constructor(
    public router: Router,
    public responsiveService: ResponsiveService
  ) {

 
  }
  ngOnDestroy(): void {
    this.responsiveService.unsubscribe()
  }


  ngOnInit(): void {
    this.startAnimation()
    this.responsiveService.screenListener()
  }


  startAnimation() {
    setTimeout(() => {
      this.backGroundAnimation = false
    }, 500);
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
