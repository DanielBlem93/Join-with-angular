import { TestBed } from '@angular/core/testing';

import { DropdownService } from './dropdown.service';
import { appConfig } from '../app.config';

describe('DropdownService', () => {
  let service: DropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({
          imports: [
      
            ],
            providers: [appConfig.providers],
    });
    service = TestBed.inject(DropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
