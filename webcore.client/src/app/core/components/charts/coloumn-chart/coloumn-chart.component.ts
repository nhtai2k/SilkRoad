import { Component, OnInit, OnDestroy } from '@angular/core';
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

  ngOnInit() {
    this.createChart();
  }

  ngOnDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  }

  private createChart() {
    // Create root element
    this.root = am5.Root.new('columnChartDiv');

    // Set themes
    this.root.setThemes([
      am5themes_Animated.new(this.root)
    ]);

    // Create chart
    const chart = this.root.container.children.push(
      am5xy.XYChart.new(this.root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX'
      })
    );

    // Add cursor
    const cursor = chart.set('cursor', am5xy.XYCursor.new(this.root, {
      behavior: 'zoomX'
    }));
    cursor.lineY.set('visible', false);

    // Sample data
    const data = [
      { category: 'January', value: 100 },
      { category: 'February', value: 150 },
      { category: 'March', value: 200 },
      { category: 'April', value: 180 },
      { category: 'May', value: 250 },
      { category: 'June', value: 300 },
      { category: 'July', value: 280 },
      { category: 'August', value: 320 },
      { category: 'September', value: 290 },
      { category: 'October', value: 350 },
      { category: 'November', value: 380 },
      { category: 'December', value: 400 }
    ];

    // Create axes
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(this.root, {
        categoryField: 'category',
        renderer: am5xy.AxisRendererX.new(this.root, {
          minorGridEnabled: true
        }),
        tooltip: am5.Tooltip.new(this.root, {})
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(this.root, {
        renderer: am5xy.AxisRendererY.new(this.root, {})
      })
    );

    // Add series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(this.root, {
        name: 'Sales',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        categoryXField: 'category',
        tooltip: am5.Tooltip.new(this.root, {
          labelText: '{categoryX}: {valueY}'
        })
      })
    );

    // Set data
    xAxis.data.setAll(data);
    series.data.setAll(data);

    // Add scrollbar
    // chart.set('scrollbarX', am5.Scrollbar.new(this.root, {
    //   orientation: 'horizontal'
    // }));

    // Make stuff animate on load
    series.appear(1000);
    chart.appear(1000, 100);
  }
}
