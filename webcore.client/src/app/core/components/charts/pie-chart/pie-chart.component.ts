import { Component, OnInit, OnDestroy, input, effect } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-pie-chart',
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit, OnDestroy {
  private root!: am5.Root;
  private chart!: am5percent.PieChart;
  private series!: am5percent.PieSeries;
  private legend!: am5.Legend;
  
  data = input<any[]>([]);
  // id = input<string>('pieChartDiv');
  showLegend = input<boolean>(true);
  valueField = input<string>('value');
  categoryField = input<string>('category');

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
    this.root = am5.Root.new("pieChartDiv");

    // Set themes
    this.root.setThemes([
      am5themes_Animated.new(this.root)
    ]);

    // Create chart
    this.chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        layout: this.root.verticalLayout
      })
    );

    // Create series
    this.series = this.chart.series.push(
      am5percent.PieSeries.new(this.root, {
        valueField: this.valueField(),
        categoryField: this.categoryField(),
        tooltip: am5.Tooltip.new(this.root, {
          labelText: '{category}: {value}'
        })
      })
    );

    // Create legend if enabled
    if (this.showLegend()) {
      this.legend = this.chart.children.push(
        am5.Legend.new(this.root, {
          centerX: am5.percent(50),
          x: am5.percent(50),
          marginTop: 15,
          marginBottom: 15,
        })
      );
    }

    // Initial chart animation
    this.series.appear(1000, 100);

    // Load initial data if available
    const initialData = this.data();
    if (initialData && initialData.length > 0) {
      this.updateChartData(initialData);
    }
  }

  private updateChartData(data: any[]): void {
    if (this.series && data) {
      this.series.data.setAll(data);
      
      // Update legend data if legend exists
      if (this.legend) {
        this.legend.data.setAll(this.series.dataItems);
      }
    }
  }
}
