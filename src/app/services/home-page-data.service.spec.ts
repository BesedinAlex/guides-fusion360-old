import { TestBed } from '@angular/core/testing';

import { HomePageDataService } from './home-page-data.service';

describe('PreviewDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomePageDataService = TestBed.get(HomePageDataService);
    expect(service).toBeTruthy();
  });
});
