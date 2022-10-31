import { TestBed } from '@angular/core/testing';

import { ComplianceQuestionService } from './compliance-question.service';

describe('ComplianceQuestionService', () => {
  let service: ComplianceQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplianceQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
