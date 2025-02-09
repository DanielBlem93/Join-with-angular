import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskModalComponent } from './add-task-modal.component';
import { appConfig } from '../../../../app.config';

describe('AddTaskModalComponent', () => {
  let component: AddTaskModalComponent;
  let fixture: ComponentFixture<AddTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskModalComponent],
      providers: [appConfig.providers],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
