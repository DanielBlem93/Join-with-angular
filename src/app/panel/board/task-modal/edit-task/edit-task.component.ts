import { Component, ViewEncapsulation } from '@angular/core';
import { HelpersService } from '../../../../services/helpers.service';
import { AddTaskComponent } from "../../../add-task/add-task.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [AddTaskComponent,CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
   encapsulation: ViewEncapsulation.None
})
export class EditTaskComponent {
selectedTask: any;


  constructor(public helpers: HelpersService) {

  }

  showTask(){
    this.helpers.modalControls.showTaskMode = true;
    this.helpers.modalControls.editTaskMode = false;
  }

}
