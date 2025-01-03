import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { introAnimation } from '../../animations/intro.animation';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [introAnimation]
})
export class HeaderComponent implements OnInit {
  backGroundAnimation = true;
  constructor(public router: Router) {

  }
  ngOnInit(): void {
    this.startAnimation()
  }


  startAnimation() {
    setTimeout(() => {
      this.backGroundAnimation = false
    }, 500);
    
  }
}
