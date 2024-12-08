import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent implements OnInit {

  dropdown1Open: boolean
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
  selectbox1Content: any = false;

  constructor(private elRef: ElementRef) {
    this.dropdown1Open = false
    this.dropdown2Open = false
  }
  ngOnInit(): void {
    document.addEventListener('click', this.fillSelectbox.bind(this))
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.fillSelectbox.bind(this))
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


  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event): void {
    const dropdownMenu1 = this.elRef.nativeElement.querySelector('.dropdown-category');
    const dropdownMenu2 = this.elRef.nativeElement.querySelector('.dropdown-assinged-to');

    if (this.dropdown1Open && dropdownMenu1 && !dropdownMenu1.contains(event.target)) {
      this.toggleDropdown('dropdown-category');
    }

    if (this.dropdown2Open && dropdownMenu2 && !dropdownMenu2.contains(event.target)) {
      this.toggleDropdown('dropdown-assinged-to');
    }
  }




  /**
   * Renders the categorys to the dropdown menu
   */
  renderCategorys() {
    let categorysContainer = document.getElementById('categorys') as HTMLElement;
    categorysContainer.innerHTML = "";
    for (let i = 0; i < this.categorys.length; i++) {
      let categoryName = this.categorys[i].category;
      let categoryColor = this.categorys[i].color;

      categorysContainer.innerHTML += /*html*/` 
   <div onclick="selectTaskCategory(${i})" id="s${i}" class="dropdown-option category">${categoryName} <div class="circle-${categoryColor}"></div>
     </div>`;
    }
  }



  selectTaskCategory(id: number) {
    let selectBox = document.getElementById('select-box') as HTMLElement;
    let selected = document.getElementById(`s${id}`) as HTMLElement;
    debugger
    if (selectBox.innerHTML.includes(`id="s${id}"`)) {

      this.clearSelectBox('select-box')

    } else {
      this.toggleDropdown('dropdown-category')
      this.clearSelectBox('select-box')
      selectBox.innerHTML += selected.outerHTML
    }
  }


  clearSelectBox(selectbox: string) {
    let selectBox = document.getElementById(`${selectbox}`) as HTMLElement;
    selectBox.innerHTML = "";
  }

  /**
 * adds select task category to the top if the select-box is empty
 */




  fillSelectbox() {
    let selectBox = document.getElementById('select-box') as HTMLElement;
    if (selectBox.innerHTML == "") {
      selectBox.innerHTML =/*html*/ `  
      <div class="dropdown-option dropdown-start-text">
          <div id="select-task-category width95" style="display: unset;">Select task category</div>
         <div id="select-task-category-img"><img src="assets/img/vector2.svg">
        </div>
      </div>`;
    }
  }

}


