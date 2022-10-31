import { TestBed } from '@angular/core/testing';

import { CommonQuestionService } from './common-question.service';

describe('CommonQuestionService', () => {
  let service: CommonQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
