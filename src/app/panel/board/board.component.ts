import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { onSnapshot, Unsubscribe, updateDoc } from 'firebase/firestore';
import { Tasks } from '../../interfaces/tasks';
import { CommonModule } from '@angular/common';
import { CompletedSubtasksPipe } from '../../pipes/completed-subtasks.pipe';
import { Task } from '../../models/task.class';
import { Status } from '../../interfaces/status';
import { TodoBoxComponent } from "./todo-box/todo-box.component";
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