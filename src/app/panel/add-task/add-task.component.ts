import { Component, ElementRef, HostListener, inject, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {


  dropdown2Open: boolean
  DROPDOWN_MIN_HEIGHT = '51px';
  DROPDOWN_MAX_HEIGHT = '204px';
  DROPDOWN_Z_INDEX = '20';

  categorys = [
    {
      'category': 'Sales',
      'color': 'red'
    },
    {
      'category': 'Backoffice',
      'color': 'green'
    },
    {
      'category': 'Development',
      'color': 'orange'
    },
    {
      'category': 'Testing',
      'color': 'purple'
    },
  ]
  catDropDownCtrl = {
    open: false,
    selectedName: '',
    selectedColor: '',
    newCatMode: false,
    catSelected: false,
    inputValue: '',
  }


  constructor(private elRef: ElementRef,) {

    this.dropdown2Open = false

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }


/**
 * This functions is used to open and close the dropdown menus
 * @param {string} menuClass - this is the class of the menu, givin in the HTML,  
 * that you want to open and close
 */
  toggleDropdown(menuClass: any) {
    const dropdownMenu = document.getElementsByClassName(menuClass)[0] as HTMLElement;

    if (dropdownMenu.style.height === this.DROPDOWN_MIN_HEIGHT && !this.catDropDownCtrl.newCatMode) {
      this.openDropdown(dropdownMenu)
    } else {
      this.closeDropdown(dropdownMenu)
    }
    this.setDropdownVariable(menuClass)
  }

  /**
   * Set styles to open the Dropdown
   * @param dropdownMenu the dropdown you want to open
   */
  openDropdown(dropdownMenu: HTMLElement) {
    dropdownMenu.style.height = this.DROPDOWN_MAX_HEIGHT;
    dropdownMenu.style.overflow = 'scroll';
    dropdownMenu.style.position = 'absolute';
    dropdownMenu.style.zIndex = this.DROPDOWN_Z_INDEX;
  }


  /**
   * Set styles to close the Dropdown
   * @param dropdownMenu the dropdown you want to close
   */
  closeDropdown(dropdownMenu: any) {
    dropdownMenu.scrollTo(top)
    dropdownMenu.style.height = this.DROPDOWN_MIN_HEIGHT;
    dropdownMenu.style.overflow = 'hidden';
    dropdownMenu.style.position = '';
    dropdownMenu.style.zIndex = '';
  }


/**
 * Set control variables Dropdowncontols objects
 * @param menuClass dropdown-category or dropdown-assinged-to
 */
  setDropdownVariable(menuClass: any) {
    if (menuClass === 'dropdown-category') {
      this.catDropDownCtrl.open = !this.catDropDownCtrl.open
    } else {
      this.dropdown2Open = !this.dropdown2Open
    }
  }

  
  /**
   * Close Dropdown if you click outside of the dropdownmenu
   * @param event clickevent
   */
  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event): void {
    const dropdownMenu1 = this.elRef.nativeElement.querySelector('.dropdown-category');
    const dropdownMenu2 = this.elRef.nativeElement.querySelector('.dropdown-assinged-to');

    if (this.catDropDownCtrl.open && dropdownMenu1 && !dropdownMenu1.contains(event.target)) {
      this.toggleDropdown('dropdown-category');
    }

    if (this.dropdown2Open && dropdownMenu2 && !dropdownMenu2.contains(event.target)) {
      this.toggleDropdown('dropdown-assinged-to');
    }
  }


/**
 * Select the Category from the dropdown
 * @param name the categoryname
 * @param color the categorycolor
 */
  selectTaskCategory(name: string, color: string) {
    this.catDropDownCtrl.selectedName = name
    this.catDropDownCtrl.selectedColor = color
    this.catDropDownCtrl.catSelected = true
    this.toggleDropdown('dropdown-category')

  }


  /**
 * adds the new Category input to the dropdown
 */
  newCategory() {
    this.catDropDownCtrl.inputValue = ''
    this.catDropDownCtrl.selectedName = ''
    this.catDropDownCtrl.selectedColor = ''
    this.catDropDownCtrl.newCatMode = !this.catDropDownCtrl.newCatMode
    this.toggleDropdown('dropdown-category')
  }


/**
 * Reset Dropdown and all variables
 */
  resetCatDropdown() {
    this.catDropDownCtrl.open = false
    this.catDropDownCtrl.selectedName = ''
    this.catDropDownCtrl.selectedColor = ''
    this.catDropDownCtrl.catSelected = false
    this.catDropDownCtrl.newCatMode = false
    this.catDropDownCtrl.inputValue = ''

  }


/**
 * add new Category to the dropdown 
 */
  addNewCategory() {
    const selectedColorInput = document.querySelector<HTMLInputElement>('input[name="color"]:checked');

    if (selectedColorInput && this.inputsFilld(selectedColorInput)) {
      this.createNewCategory(selectedColorInput);
      this.catDropDownCtrl.catSelected = true;
      this.catDropDownCtrl.newCatMode = false;
      this.toggleDropdown('dropdown-category');
      console.log(this.catDropDownCtrl)
    } else {
      // show alert
    }

  }


  /**
   * Pushes the created category to the category array
   * @param selectedColorInput the color for the circle
   */
  createNewCategory(selectedColorInput: HTMLInputElement) {
    this.catDropDownCtrl.selectedName = this.catDropDownCtrl.inputValue.trim();
    this.catDropDownCtrl.selectedColor = selectedColorInput.value;
    this.categorys.push({
      category: this.catDropDownCtrl.inputValue.trim(),
      color: selectedColorInput.value
    })
  }


  /**
   * Checks that the input is not empty and a color is selceted
   * @param input the color pallet fildset
   * @returns false if not 
   */
  inputsFilld(input: HTMLInputElement | null) {
    if (!this.catDropDownCtrl.inputValue.trim()) {
      alert('Please enter a category name.');
      return false;
    }

    if (!input) {
      alert('Please select a color.');
      return false;
    }
    return true
  }

}


