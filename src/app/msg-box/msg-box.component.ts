import { Component } from '@angular/core';
import { HelpersService } from '../services/helpers.service';

@Component({
  selector: 'app-msg-box',
  standalone: true,
  imports: [],
  templateUrl: './msg-box.component.html',
  styleUrl: './msg-box.component.scss'
})
export class MsgBoxComponent {
  
  constructor(public helpers: HelpersService) {

  }

/**
 * How to use msgBox:
 * 
 * Import msgBox component and Add this to your HTML:
 *   <app-msg-box [@openClose]="helpers.isOpen ? 'open' : 'closed'" ></app-msg-box>
 * 
 * Import msgBoxAnimaion in your component
 *    import { msgBoxAnimation } from '../../animations/msgBox.animations';
 * 
 * declare animations with msgBoxAnimation in your component.ts
    * @Component({
      //
      //
      animations: [msgBoxAnimation]
    })
 
 
  *Import helpersService for msgBox controls

    constructor(
      public helpers: HelpersService
    ) 
  
  * Use toggleMsg('message as string') method to open and close the 
    box with your wished message as param :string
 */

 
  
}
