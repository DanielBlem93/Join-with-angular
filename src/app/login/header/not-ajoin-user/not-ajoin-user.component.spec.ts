import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAJoinUserComponent } from './not-ajoin-user.component';

describe('NotAJoinUserComponent', () => {
  let component: NotAJoinUserComponent;
  let fixture: ComponentFixture<NotAJoinUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotAJoinUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotAJoinUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
