import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedClusteredColumnChartComponent } from './stacked-clustered-column-chart.component';

describe('StackedClusteredColumnChartComponent', () => {
  let component: StackedClusteredColumnChartComponent;
  let fixture: ComponentFixture<StackedClusteredColumnChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackedClusteredColumnChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackedClusteredColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
