import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowcontactsModalControlsComponent } from './show-contacts-modal.component';
import { appConfig } from '../../../app.config';

describe('contactsModalControlsComponent', () => {
  let component: ShowcontactsModalControlsComponent;
  let fixture: ComponentFixture<ShowcontactsModalControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcontactsModalControlsComponent],
      providers: [appConfig.providers],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ShowcontactsModalControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
