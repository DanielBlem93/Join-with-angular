import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpersService } from '../../../services/helpers.service';
import { ShowTaskComponent } from "./show-task/show-task.component";
import { EditTaskComponent } from "./edit-task/edit-task.component";
import { AddTaskModalComponent } from "./add-task-modal/add-task-modal.component";


@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, ShowTaskComponent, EditTaskComponent, AddTaskModalComponent],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',

})
export class TaskModalComponent {



  constructor(public helpers: HelpersService,
  ) { }


}
