import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldSurveyFormComponent } from './gold-survey-form.component';

describe('GoldSurveyFormComponent', () => {
  let component: GoldSurveyFormComponent;
  let fixture: ComponentFixture<GoldSurveyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldSurveyFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoldSurveyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
