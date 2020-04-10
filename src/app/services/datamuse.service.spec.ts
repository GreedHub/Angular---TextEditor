import { TestBed } from '@angular/core/testing';

import { DatamuseService } from './datamuse.service';

describe('DatamuseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatamuseService = TestBed.get(DatamuseService);
    expect(service).toBeTruthy();
  });
});
