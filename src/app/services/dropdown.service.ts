import { Injectable, } from '@angular/core';
import { AssignContacts } from '../interfaces/assign-contacts';
import { AssignEmails } from '../interfaces/assign-emails';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

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
    touched: false,
    selectedName: '',
    selectedColor: '',
    newCatMode: false,
    catSelected: false,
    inputValue: '',
    errorMessage: ''
  }

  assignDropDownCtrl = {
    open: false,
    inputValue: '',
    errorMessage: '',
    selectedEmails:[] as AssignContacts[]  ,
    contacts: [] as AssignContacts[],
  }


  constructor() {

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
      this.catDropDownCtrl.touched = true
    } else {
      this.assignDropDownCtrl.open = !this.assignDropDownCtrl.open
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
      if (this.createNewCategory(selectedColorInput)) {
        this.catDropDownCtrl.catSelected = true;
        this.catDropDownCtrl.newCatMode = false;
        this.toggleDropdown('dropdown-category');
      }
    } else {
      this.displayError('Please select a color and a name for your category')
    }
  }


  /**
   * Pushes the created category to the category array
   * @param selectedColorInput the color for the circle
   */
  createNewCategory(selectedColorInput: HTMLInputElement) {

    const trimmedName = this.catDropDownCtrl.inputValue.trim();

    if (this.isCategoryDuplicate(trimmedName)) {
      this.displayError('This category already exists. Please choose a different name.');
      return false;
    } else
      this.setCategory(trimmedName, selectedColorInput.value)
    return true
  }


  /**
   * Set the dropdown values to the object and pushes new Category into the array
   * @param trimmedName the value from the inputfield
   * @param color the color from the radiobutton
   */
  setCategory(trimmedName: string, color: string) {
    this.catDropDownCtrl.errorMessage = '';
    this.catDropDownCtrl.selectedName = trimmedName;
    this.catDropDownCtrl.selectedColor = color

    this.categorys.push({
      category: trimmedName,
      color: color
    });
  }


  /**
 * Checks if a category with the given name already exists.
 * @param categoryName The name of the category to check.
 * @returns True if the category exists, false otherwise.
 */
  isCategoryDuplicate(categoryName: string): boolean {
    return this.categorys.some(
      (category) => category.category.toLowerCase() === categoryName.toLowerCase()
    );
  }

  /**
 * Displays an error message.
 * @param message The error message to display.
 */
  displayError(message: string) {
    this.catDropDownCtrl.errorMessage = message;
    console.error(message);
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
