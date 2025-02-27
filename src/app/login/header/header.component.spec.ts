import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, BrowserAnimationsModule],
      providers: [
        { provide: Router, useValue: {} },
        { provide: ActivatedRoute, useValue: {} }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should startAnimation', () => {
    spyOn(window, 'scrollTo');
    component.startAnimation();
    expect(window.scrollTo).toHaveBeenCalled();
    setTimeout(() => {
      
      expect(component.backGroundAnimation).toBeFalse();
    }, 1000);
  });
});
