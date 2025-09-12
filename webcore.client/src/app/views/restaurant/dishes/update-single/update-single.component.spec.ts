import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSingleComponent } from './update-single.component';

describe('UpdateSingleComponent', () => {
  let component: UpdateSingleComponent;
  let fixture: ComponentFixture<UpdateSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSingleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
