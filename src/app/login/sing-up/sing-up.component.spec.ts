import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingUpComponent } from './sing-up.component';
import { appConfig } from '../../app.config';

describe('SingUpComponent', () => {
  let component: SingUpComponent;
  let fixture: ComponentFixture<SingUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingUpComponent],
      providers: [appConfig.providers],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SingUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
