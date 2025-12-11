import { Component, OnInit, OnDestroy, input, effect } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-coloumn-chart',
  imports: [],
  templateUrl: './coloumn-chart.component.html',
  styleUrl: './coloumn-chart.component.scss',
})
export class ColoumnChartComponent implements OnInit, OnDestroy {
  private root!: am5.Root;
  private chart!: am5xy.XYChart;
  private series!: am5xy.ColumnSeries;
  private xAxis!: am5xy.CategoryAxis<am5xy.AxisRendererX>;
  
  data = input<any[]>([]);

  constructor() {
    // Watch for data changes
    effect(() => {
      const currentData = this.data();
      if (this.root && currentData && currentData.length > 0) {
        this.updateChartData(currentData);
      }
    });
  }

  ngOnInit() {
    this.initializeChart();
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }

  private initializeChart(): void {
    // Create root element
    this.root = am5.Root.new('columnChartDiv');

    // Set themes
    this.root.setThemes([
      am5themes_Animated.new(this.root)
    ]);

    // Create chart
    this.chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX'
      })
    );

    // Add cursor
    const cursor = this.chart.set('cursor', am5xy.XYCursor.new(this.root, {
      behavior: 'zoomX'
    }));
    cursor.lineY.set('visible', false);

    // Create axes
    this.xAxis = this.chart.xAxes.push(
      am5xy.CategoryAxis.new(this.root, {
        categoryField: 'category',
        renderer: am5xy.AxisRendererX.new(this.root, {
          minorGridEnabled: true
        }),
        tooltip: am5.Tooltip.new(this.root, {})
      })
    );

    const yAxis = this.chart.yAxes.push(
      am5xy.ValueAxis.new(this.root, {
        renderer: am5xy.AxisRendererY.new(this.root, {})
      })
    );

    // Add series
    this.series = this.chart.series.push(
      am5xy.ColumnSeries.new(this.root, {
        name: 'Data',
        xAxis: this.xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        categoryXField: 'category',
        tooltip: am5.Tooltip.new(this.root, {
          labelText: '{categoryX}: {valueY}'
        })
      })
    );

    // Initial chart animation
    this.series.appear(1000);
    this.chart.appear(1000, 100);

    // Load initial data if available
    const initialData = this.data();
    if (initialData && initialData.length > 0) {
      this.updateChartData(initialData);
    }
  }

  private updateChartData(data: any[]): void {
    if (this.xAxis && this.series && data) {
      this.xAxis.data.setAll(data);
      this.series.data.setAll(data);
    }
  }
}
