import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddcontactsModalControlsComponent } from './add-contacts-modal.component';
import { appConfig } from '../../../app.config';

describe('AddcontactsModalControlsComponent', () => {
  let component: AddcontactsModalControlsComponent;
  let fixture: ComponentFixture<AddcontactsModalControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcontactsModalControlsComponent],
    providers: [appConfig.providers],
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
