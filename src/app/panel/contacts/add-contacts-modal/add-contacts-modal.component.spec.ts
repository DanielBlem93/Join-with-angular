import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcontactsModalControlsComponent } from './add-contacts-modal.component';

describe('AddcontactsModalControlsComponent', () => {
  let component: AddcontactsModalControlsComponent;
  let fixture: ComponentFixture<AddcontactsModalControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcontactsModalControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcontactsModalControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
