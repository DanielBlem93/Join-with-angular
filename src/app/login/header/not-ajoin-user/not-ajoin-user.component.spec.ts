import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAJoinUserComponent } from './not-ajoin-user.component';
import { provideRouter } from '@angular/router';

describe('NotAJoinUserComponent', () => {
  let component: NotAJoinUserComponent;
  let fixture: ComponentFixture<NotAJoinUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotAJoinUserComponent],
      providers: [provideRouter([])]
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
