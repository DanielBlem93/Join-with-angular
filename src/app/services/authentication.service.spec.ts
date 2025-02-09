import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { appConfig } from '../app.config';

describe('AuthService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [appConfig.providers],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
