import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";

import { PanelHeaderComponent } from "../panel-header/panel-header.component";
import { RouterLink } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';
import { getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {

  docCounter: number = 0
  urgentCounter: number = 0

  constructor(private fireService: FirebaseService) {


    this.getTasks()


  }
  ngOnInit(): void {
    this.countDocs()
    this.countUrgents()
  }


  // getTasks(): Observable<any[]> {
  //   return 
  // }

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


  async getTasks() {

    const querySnapshot = await getDocs(this.fireService.tasksDatabase);
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
    });
  }

  async countDocs() {
    const querySnapshot = await getDocs(this.fireService.tasksDatabase);
    querySnapshot.forEach((doc) => {
      this.docCounter++
    });
  }
  async countUrgents() {
    const querySnapshot = await getDocs(this.fireService.tasksDatabase);
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      // console.log(data)
      if (data['priority'] === 'urgent') {
        this.urgentCounter++
      }
    });
  }

}
