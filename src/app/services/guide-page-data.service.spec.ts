import { TestBed } from '@angular/core/testing';

import { GuidePageDataService } from './guide-page-data.service';

describe('GuidePageDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuidePageDataService = TestBed.get(GuidePageDataService);
    expect(service).toBeTruthy();
  });
});
