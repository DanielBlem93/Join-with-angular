import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAreaComponent } from './drag-area.component';
import { FirebaseService } from '../../../services/firebase.service';
import { appConfig } from '../../../app.config';


describe('DragAreaComponent', () => {
  let component: DragAreaComponent;
  let fixture: ComponentFixture<DragAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragAreaComponent],
    providers: [appConfig.providers],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DragAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
