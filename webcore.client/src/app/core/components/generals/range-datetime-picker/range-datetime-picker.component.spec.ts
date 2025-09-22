import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeDatetimePickerComponent } from './range-datetime-picker.component';

describe('RangeDatetimePickerComponent', () => {
  let component: RangeDatetimePickerComponent;
  let fixture: ComponentFixture<RangeDatetimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RangeDatetimePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RangeDatetimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
