import { TestBed } from '@angular/core/testing';

import { QuestionMembershipService } from './question-membership.service';

describe('QuestionMembershipService', () => {
  let service: QuestionMembershipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionMembershipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
