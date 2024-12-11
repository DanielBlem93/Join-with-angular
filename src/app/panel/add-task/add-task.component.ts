import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, } from '@angular/forms';
import { DropdownService } from '../../services/dropdown.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {




  constructor(public ds : DropdownService, private elRef : ElementRef) {



  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }


  /**
   * Close Dropdown if you click outside of the dropdownmenu
   * @param event clickevent
   */
  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event): void {
    const dropdownMenu1 = this.elRef.nativeElement.querySelector('.dropdown-category');
    const dropdownMenu2 = this.elRef.nativeElement.querySelector('.dropdown-assinged-to');

    if (this.ds.catDropDownCtrl.open && dropdownMenu1 && !dropdownMenu1.contains(event.target)) {
      this.ds.toggleDropdown('dropdown-category');
    }

    if (this.ds.dropdown2Open && dropdownMenu2 && !dropdownMenu2.contains(event.target)) {
      this.ds.toggleDropdown('dropdown-assinged-to');
    }
  }


}


