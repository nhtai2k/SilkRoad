import { TestBed } from '@angular/core/testing';

import { SurveyReportService } from './survey-report.service';

describe('SurveyReportService', () => {
  let service: SurveyReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
