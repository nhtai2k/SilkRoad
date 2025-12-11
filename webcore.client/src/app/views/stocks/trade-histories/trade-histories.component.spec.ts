import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeHistoriesComponent } from './trade-histories.component';

describe('TradeHistoriesComponent', () => {
  let component: TradeHistoriesComponent;
  let fixture: ComponentFixture<TradeHistoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeHistoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeHistoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
