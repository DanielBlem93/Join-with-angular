import { TestBed } from '@angular/core/testing';

import { CatDropdownService } from './cat-dropdown.service';

describe('CatDropdownService', () => {
  let service: CatDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
