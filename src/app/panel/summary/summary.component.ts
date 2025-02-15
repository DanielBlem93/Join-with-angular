import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelHeaderComponent } from "../panel-header/panel-header.component";
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';
import { doc, getDocs } from 'firebase/firestore';
import { Tasks } from '../../interfaces/tasks';
import { AuthenticationService } from '../../services/authentication.service';
import { ResponsiveService } from '../../services/responsive.service';
import { introAnimation } from '../../animations/intro.animation';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
  animations:[introAnimation]
})
export class SummaryComponent implements OnInit, OnDestroy {

  docCounter: number = 0
  urgentCounter: number = 0
  inProgressCounter: number = 0;
  awaitingFeedbackCounter: number = 0;
  todoCounter: number = 0;
  doneCounter: number = 0;
  animationPlayed: boolean = false
  constructor(
    private fireService: FirebaseService,
    public authService: AuthenticationService,
    public responsiveService: ResponsiveService) {

  }
  ngOnDestroy(): void {
    this.responsiveService.unsubscribe()
  }


  ngOnInit(): void {
    this.countDocs()
    this.responsiveService.screenListener()
    this.startAnimation()

  }

  startAnimation() {
    if (!this.animationPlayed) {
      setTimeout(() => {
          this.animationPlayed = true
      }, 1000);
      
    }
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




  async countDocs() {
    const querySnapshot = await getDocs(this.fireService.tasksDatabase);
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      this.docCounter++
      this.countUrgents(data as Tasks)
      this.countStatus(data as Tasks)

    });
  }
  async countUrgents(data: Tasks) {

    if (data['priority'] === 'urgent') {
      this.urgentCounter++
    }

  }


  async countStatus(data: Tasks) {
    switch (data['status']) {
      case 'in-progress':
        this.inProgressCounter++
        break;
      case 'done':
        this.doneCounter++
        break
      case 'awaiting-feedback':
        this.awaitingFeedbackCounter++
        break
      case 'todo':
        this.todoCounter++
        break
    }
  }






}
