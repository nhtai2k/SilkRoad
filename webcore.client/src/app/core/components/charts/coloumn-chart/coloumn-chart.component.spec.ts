import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColoumnChartComponent } from './coloumn-chart.component';

describe('ColoumnChartComponent', () => {
  let component: ColoumnChartComponent;
  let fixture: ComponentFixture<ColoumnChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColoumnChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColoumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
