import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoBoxComponent } from './todo-box.component';
import { appConfig } from '../../../../app.config';

describe('TodoBoxComponent', () => {
  let component: TodoBoxComponent;
  let fixture: ComponentFixture<TodoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoBoxComponent],
      providers: [appConfig.providers],
    })
      .compileComponents();

    fixture = TestBed.createComponent(TodoBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
