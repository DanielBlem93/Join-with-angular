import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoBoxComponent } from './todo-box.component';

describe('TodoBoxComponent', () => {
  let component: TodoBoxComponent;
  let fixture: ComponentFixture<TodoBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoBoxComponent]
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
