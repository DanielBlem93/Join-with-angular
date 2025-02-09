import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { appConfig } from '../app.config';


describe('FirebaseService', () => {
  let service: FirebaseService;


  beforeEach(async () => {



    TestBed.configureTestingModule({
      imports: [

      ],
      providers: [appConfig.providers],
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
