import { TestBed } from '@angular/core/testing';

import { ReviewTicketsService } from './review-tickets.service';

describe('ReviewTicketsService', () => {
  let service: ReviewTicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewTicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
