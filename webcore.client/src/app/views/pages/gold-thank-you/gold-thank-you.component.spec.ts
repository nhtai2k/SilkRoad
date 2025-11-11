import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldThankYouComponent } from './gold-thank-you.component';

describe('GoldThankYouComponent', () => {
  let component: GoldThankYouComponent;
  let fixture: ComponentFixture<GoldThankYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldThankYouComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoldThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
