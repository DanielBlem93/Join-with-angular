import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { CommonModule } from '@angular/common';
import { HelpersService } from '../../services/helpers.service';
import { TaskModalComponent } from "./task-modal/task-modal.component";
import { DragAreaComponent } from "./drag-area/drag-area.component";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, TaskModalComponent, DragAreaComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent  {




  constructor(
    public fireService: FirebaseService, 
    public helpers: HelpersService) {

  
  }



}