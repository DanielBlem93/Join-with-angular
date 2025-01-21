import { ComponentFixture, TestBed } from '@angular/core/testing';

import { contactsModalControlsComponent } from './show-contacts-modal.component';

describe('contactsModalControlsComponent', () => {
  let component: contactsModalControlsComponent;
  let fixture: ComponentFixture<contactsModalControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [contactsModalControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(contactsModalControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
