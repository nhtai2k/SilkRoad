import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyInformationComponent } from './survey-information.component';

describe('SurveyInformationComponent', () => {
  let component: SurveyInformationComponent;
  let fixture: ComponentFixture<SurveyInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
