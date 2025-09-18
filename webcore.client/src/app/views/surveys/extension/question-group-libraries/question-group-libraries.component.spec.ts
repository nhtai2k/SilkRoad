import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionGroupLibrariesComponent } from './question-group-libraries.component';

describe('QuestionGroupLibrariesComponent', () => {
  let component: QuestionGroupLibrariesComponent;
  let fixture: ComponentFixture<QuestionGroupLibrariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionGroupLibrariesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionGroupLibrariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
