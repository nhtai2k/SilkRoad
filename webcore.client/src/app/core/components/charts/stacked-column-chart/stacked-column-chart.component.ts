import { Component, OnInit, OnDestroy, input, effect, AfterViewInit } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

interface StackedSeriesConfig {
  name: string;
  fieldName: string;
  color?: string;
}

@Component({
  selector: 'app-stacked-column-chart',
  imports: [],
  templateUrl: './stacked-column-chart.component.html',
  styleUrl: './stacked-column-chart.component.scss',
})
export class StackedColumnChartComponent implements AfterViewInit, OnDestroy {
  private root!: am5.Root;
  private chart!: am5xy.XYChart;
  private xAxis!: am5xy.CategoryAxis<am5xy.AxisRendererX>;
  private yAxis!: am5xy.ValueAxis<am5xy.AxisRendererY>;
  private legend!: am5.Legend;
  
  data = input<any[]>([]);
  id = input<number>(0);
  showLegend = input<boolean>(true);
  categoryField = input<string>('category');
  seriesConfig = input<StackedSeriesConfig[]>([]);
  chartTitle = input<string>('');
  minValue = input<number>(0);
  enablePanning = input<boolean>(false);
  enableZooming = input<boolean>(true);
  showDataLabels = input<boolean>(true);
  columnWidth = input<number>(90);

  constructor() {
    // Watch for data changes
    effect(() => {
      const currentData = this.data();
      if (this.root && currentData && currentData.length > 0) {
        this.updateChartData(currentData);
      }
    });

    // Watch for series config changes
    effect(() => {
      const currentSeriesConfig = this.seriesConfig();
      const currentData = this.data();
      if (this.root && this.chart && currentSeriesConfig && currentSeriesConfig.length > 0) {
        this.updateSeries(currentSeriesConfig, currentData);
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
    const name = "stackedColumnChartDiv_" + this.id();
    this.root = am5.Root.new(name);

    // Set themes
    this.root.setThemes([
      am5themes_Animated.new(this.root)
    ]);

    // Create chart
    this.chart = this.root.container.children.push(am5xy.XYChart.new(this.root, {
      panX: this.enablePanning(),
      panY: false,
      wheelX: this.enableZooming() ? "panX" : "none",
      wheelY: this.enableZooming() ? "zoomX" : "none",
      layout: this.root.verticalLayout
    }));

    // Add title if provided
    if (this.chartTitle()) {
      this.chart.children.unshift(am5.Label.new(this.root, {
        text: this.chartTitle(),
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        x: am5.percent(50),
        centerX: am5.percent(50),
        paddingTop: 0,
        paddingBottom: 20
      }));
    }

    // Add legend if enabled
    if (this.showLegend()) {
      this.legend = this.chart.children.push(am5.Legend.new(this.root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 15,
        marginBottom: 15
      }));
    }

    // Create axes
    this.xAxis = this.chart.xAxes.push(am5xy.CategoryAxis.new(this.root, {
      categoryField: this.categoryField(),
      renderer: am5xy.AxisRendererX.new(this.root, {
        cellStartLocation: 0.1,
        cellEndLocation: 0.9,
        minorGridEnabled: true
      }),
      tooltip: am5.Tooltip.new(this.root, {})
    }));

    this.yAxis = this.chart.yAxes.push(am5xy.ValueAxis.new(this.root, {
      min: this.minValue(),
      renderer: am5xy.AxisRendererY.new(this.root, {
        strokeDasharray: [1, 5],
        minorGridEnabled: true
      }),
      tooltip: am5.Tooltip.new(this.root, {})
    }));

    // Load initial data and series if available
    const initialData = this.data();
    const initialSeriesConfig = this.seriesConfig();
    
    if (initialData && initialData.length > 0) {
      this.updateChartData(initialData);
    }

    if (initialSeriesConfig && initialSeriesConfig.length > 0) {
      this.updateSeries(initialSeriesConfig, initialData);
    }

    // Make chart animate on load
    this.chart.appear(1000, 100);
  }

  private updateChartData(data: any[]): void {
    if (this.xAxis && data) {
      this.xAxis.data.setAll(data);
    }
  }

  private updateSeries(seriesConfig: StackedSeriesConfig[], data: any[]): void {
    // Clear existing series
    this.chart.series.clear();
    if (this.legend) {
      this.legend.data.clear();
    }

    // Create stacked series based on config
    seriesConfig.forEach(config => {
      this.createStackedSeries(config.name, config.fieldName, config.color, data);
    });
  }

  private createStackedSeries(name: string, fieldName: string, color?: string, data?: any[]): void {
    const series = this.chart.series.push(am5xy.ColumnSeries.new(this.root, {
      stacked: true, // All series are stacked
      name: name,
      xAxis: this.xAxis,
      yAxis: this.yAxis,
      valueYField: fieldName,
      categoryXField: this.categoryField(),
      tooltip: am5.Tooltip.new(this.root, {
        labelText: "{name}: {valueY}"
      })
    }));

    // Set custom color if provided
    if (color) {
      series.set("fill", am5.color(color));
      series.set("stroke", am5.color(color));
    }

    series.columns.template.setAll({
      tooltipText: "{name}: {valueY}\nTotal: {valueYTotal}",
      width: am5.percent(this.columnWidth()),
      tooltipY: am5.percent(10),
      strokeOpacity: 0
    });

    if (data && data.length > 0) {
      series.data.setAll(data);
    }

    // Make series animate on load
    series.appear();

    // Add data labels if enabled
    if (this.showDataLabels()) {
      series.bullets.push(() => {
        return am5.Bullet.new(this.root, {
          locationY: 0.5,
          sprite: am5.Label.new(this.root, {
            text: "{valueY}",
            fill: this.root.interfaceColors.get("alternativeText"),
            centerY: am5.percent(50),
            centerX: am5.percent(50),
            populateText: true,
            fontSize: "0.8em"
          })
        });
      });
    }

    // Add to legend if it exists
    if (this.legend) {
      this.legend.data.push(series);
    }
  }
}
