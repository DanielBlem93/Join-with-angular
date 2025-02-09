import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTaskComponent } from './show-task.component';
import { appConfig } from '../../../../app.config';

describe('ShowTaskComponent', () => {
  let component: ShowTaskComponent;
  let fixture: ComponentFixture<ShowTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowTaskComponent],
          providers: [appConfig.providers],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
