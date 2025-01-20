import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactsModalComponent } from './add-contacts-modal.component';

describe('AddContactsModalComponent', () => {
  let component: AddContactsModalComponent;
  let fixture: ComponentFixture<AddContactsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddContactsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContactsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
