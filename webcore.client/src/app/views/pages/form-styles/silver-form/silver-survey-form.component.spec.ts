import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilverSurveyFormComponent } from './silver-survey-form.component';

describe('SilverSurveyFormComponent', () => {
  let component: SilverSurveyFormComponent;
  let fixture: ComponentFixture<SilverSurveyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SilverSurveyFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SilverSurveyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
