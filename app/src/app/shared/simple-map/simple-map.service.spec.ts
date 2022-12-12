import { TestBed } from '@angular/core/testing';

import { SimpleMapService } from './simple-map.service';

describe('SimpleMapService', () => {
  let service: SimpleMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
