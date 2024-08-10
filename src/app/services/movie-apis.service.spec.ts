import { TestBed } from '@angular/core/testing';

import { MovieApisService } from './movie-apis.service';

describe('MovieApisService', () => {
  let service: MovieApisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieApisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
