import { Component, OnDestroy, input, effect, AfterViewInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export interface ClusteredColumnSeries {
  name: string;
  fieldName: string;
}

@Component({
  selector: 'app-clustered-column-chart',
  imports: [],
  templateUrl: './clustered-column-chart.component.html',
  styleUrl: './clustered-column-chart.component.scss',
})
export class ClusteredColumnChartComponent implements AfterViewInit, OnDestroy {
  private root!: am5.Root;
  private chart!: am5xy.XYChart;
  private xAxis!: am5xy.CategoryAxis<am5xy.AxisRendererX>;
  private yAxis!: am5xy.ValueAxis<am5xy.AxisRendererY>;
  private legend!: am5.Legend;
  private seriesCollection: am5xy.ColumnSeries[] = [];
  
  data = input<any[]>([]);
  id = input<number>(0);
  showLegend = input<boolean>(true);
  categoryField = input<string>('category');
  series = input<ClusteredColumnSeries[]>([]);
  panX = input<boolean>(false);
  panY = input<boolean>(false);
  wheelX = input<'panX' | 'none' | 'zoomX'>('panX');
  wheelY = input<'panY' | 'none' | 'zoomX' | 'zoomY'>('zoomX');

  constructor() {
    // Watch for data changes
    effect(() => {
      const currentData = this.data();
      if (this.root && currentData && currentData.length > 0) {
        this.updateChartData(currentData);
      }
    });

    // Watch for series changes
    effect(() => {
      const currentSeries = this.series();
      if (this.root && currentSeries && currentSeries.length > 0) {
        this.createSeries(currentSeries);
      }
    });
  }

  ngAfterViewInit() {
    this.initializeChart();
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }

  private initializeChart(): void {
    // Create root element
    const chartId = 'clusteredColumnChartDiv_' + this.id();
    this.root = am5.Root.new(chartId);

    // Set themes
    this.root.setThemes([
      am5themes_Animated.new(this.root)
    ]);

    // Create chart
    this.chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panX: this.panX(),
        panY: this.panY(),
        wheelX: this.wheelX(),
        wheelY: this.wheelY(),
        layout: this.root.verticalLayout
      })
    );

    // Create legend if enabled
    if (this.showLegend()) {
      this.legend = this.chart.children.push(
        am5.Legend.new(this.root, {
          centerX: am5.p50,
          x: am5.p50
        })
      );
    }

    // Create X axis (Category)
    this.xAxis = this.chart.xAxes.push(
      am5xy.CategoryAxis.new(this.root, {
        categoryField: this.categoryField(),
        renderer: am5xy.AxisRendererX.new(this.root, {
          cellStartLocation: 0.1,
          cellEndLocation: 0.9
        }),
        tooltip: am5.Tooltip.new(this.root, {})
      })
    );

    // Create Y axis (Value)
    this.yAxis = this.chart.yAxes.push(
      am5xy.ValueAxis.new(this.root, {
        renderer: am5xy.AxisRendererY.new(this.root, {})
      })
    );

    // Load initial data and series
    const initialData = this.data();
    const initialSeries = this.series();
    
    if (initialData && initialData.length > 0) {
      this.updateChartData(initialData);
    }

    if (initialSeries && initialSeries.length > 0) {
      this.createSeries(initialSeries);
    }

    // Chart animation
    this.chart.appear(1000, 100);
  }

  private createSeries(seriesConfig: ClusteredColumnSeries[]): void {
    // Clear existing series
    this.seriesCollection.forEach(series => {
      this.chart.series.removeValue(series);
    });
    this.seriesCollection = [];

    if (this.legend) {
      this.legend.data.clear();
    }

    // Create new series
    seriesConfig.forEach(config => {
      const series = this.chart.series.push(
        am5xy.ColumnSeries.new(this.root, {
          name: config.name,
          xAxis: this.xAxis,
          yAxis: this.yAxis,
          valueYField: config.fieldName,
          categoryXField: this.categoryField()
        })
      );

      // Configure column appearance
      series.columns.template.setAll({
        tooltipText: '{name}, {categoryX}: {valueY}',
        width: am5.percent(90),
        tooltipY: 0
      });

      // Add value labels on columns
      series.bullets.push(() => {
        return am5.Bullet.new(this.root, {
          locationY: 0,
          sprite: am5.Label.new(this.root, {
            text: '{valueY}',
            fill: this.root.interfaceColors.get('alternativeText'),
            centerY: 0,
            centerX: am5.p50,
            populateText: true
          })
        });
      });

      // Set data
      const currentData = this.data();
      if (currentData && currentData.length > 0) {
        series.data.setAll(currentData);
      }

      // Animation
      series.appear();

      // Add to legend
      if (this.legend) {
        this.legend.data.push(series);
      }

      this.seriesCollection.push(series);
    });
  }

  private updateChartData(data: any[]): void {
    if (this.xAxis && data && data.length > 0) {
      this.xAxis.data.setAll(data);
      
      // Update all series data
      this.seriesCollection.forEach(series => {
        series.data.setAll(data);
      });
    }
  }
}
