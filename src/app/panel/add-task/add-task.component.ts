import { Component } from '@angular/core';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  dropdown1Open: boolean
  dropdown2Open: boolean
  DROPDOWN_MIN_HEIGHT = '51px';
  DROPDOWN_MAX_HEIGHT = '204px';
  DROPDOWN_Z_INDEX = '20';

  constructor() {
    this.dropdown1Open = false
    this.dropdown2Open = false
  }

  toggleDropdown(menuClass: any) {
    const dropdownMenu = document.getElementsByClassName(menuClass)[0] as HTMLElement;

    if (dropdownMenu.style.height === this.DROPDOWN_MIN_HEIGHT) {
      this.openDropdown(dropdownMenu)
    } else {
      this.closeDropdown(dropdownMenu)
    }
    this.setDropdownVariable(menuClass)
  }

  openDropdown(dropdownMenu: any) {
    dropdownMenu.style.height = this.DROPDOWN_MAX_HEIGHT;
    dropdownMenu.style.overflow = 'scroll';
    dropdownMenu.style.position = 'absolute';
    dropdownMenu.style.zIndex = this.DROPDOWN_Z_INDEX;
  }

  closeDropdown(dropdownMenu: any) {
    dropdownMenu.scrollTo(top)
    dropdownMenu.style.height = this.DROPDOWN_MIN_HEIGHT;
    dropdownMenu.style.overflow = 'hidden';
    dropdownMenu.style.position = '';
    dropdownMenu.style.zIndex = '';
  }

  setDropdownVariable(menuClass: any) {
    if (menuClass === 'dropdown-category') {
      this.dropdown1Open = !this.dropdown1Open
    } else {
      this.dropdown2Open = !this.dropdown2Open
    }

  }

// window.addEventListener('click', (event) => {
//   const dropdownMenu1 = document.getElementsByClassName('dropdown-category')[0]
//   const dropdownMenu2 = document.getElementsByClassName('dropdown-assinged-to')[0]

//   if (dropdown1Open && !dropdownMenu1.contains(event.target)) {
//     toggleDropdown('dropdown-category');

//   } else if ((dropdown2Open && !dropdownMenu2.contains(event.target))) {
//     toggleDropdown('dropdown-assinged-to');

//   }
// });
}
