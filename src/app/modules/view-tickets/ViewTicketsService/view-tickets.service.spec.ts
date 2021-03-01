import { TestBed } from '@angular/core/testing';

import { ViewTicketsService } from './view-tickets.service';

describe('ViewTicketsService', () => {
  let service: ViewTicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewTicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
