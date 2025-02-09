import { TestBed } from '@angular/core/testing';
import { HelpersService } from './helpers.service';
import { appConfig } from '../app.config';

describe('HelpersService', () => {
  let service: HelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
     providers: [appConfig.providers],
    });
    service = TestBed.inject(HelpersService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
