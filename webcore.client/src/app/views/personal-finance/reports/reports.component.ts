
import { FormsModule } from '@angular/forms';
import { ColoumnChartComponent } from "@components/charts/coloumn-chart/coloumn-chart.component";
import { CardBodyComponent, CardComponent, CardHeaderComponent, FormSelectDirective, WidgetStatAComponent, DropdownComponent, RowComponent, ColComponent, TemplateIdDirective, ThemeDirective, DropdownToggleDirective, DropdownMenuDirective, DropdownItemDirective, DropdownDividerDirective } from '@coreui/angular';
import { AssetReportService, ExpenseReportService, ResourceReportService } from '@services/personal-finance-services';
import { AuthService } from '@services/system-services';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective, ButtonGroupComponent, FormCheckLabelDirective, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { PieChartComponent, ClusteredColumnChartComponent } from "@components/charts";
import { ResourceMonthReportModel } from '@models/personal-finance-models';
import { ChartjsComponent } from "@coreui/angular-chartjs";
import { getStyle } from '@coreui/utils';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reports',
  imports: [ColoumnChartComponent, CardComponent, CardBodyComponent, CardHeaderComponent, FormsModule,
    TextColorDirective, ButtonDirective, IconDirective, ButtonGroupComponent,
    ReactiveFormsModule, FormCheckLabelDirective, FormSelectDirective, PieChartComponent, ClusteredColumnChartComponent, WidgetStatAComponent, ChartjsComponent,
    TemplateIdDirective],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ReportsComponent implements OnInit {
  userInfor!: any;
  //Widget dropdown
  data: any[] = [];
  options: any[] = [];
  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
    'April'
  ];
  datasets = [
    [{
      label: 'My First dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-primary'),
      pointHoverBorderColor: getStyle('--cui-primary'),
      data: [65, 59, 84, 84, 51, 55, 40]
    }], [{
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-info'),
      pointHoverBorderColor: getStyle('--cui-info'),
      data: [1, 18, 9, 17, 34, 22, 11]
    }], [{
      label: 'My Third dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      pointBackgroundColor: getStyle('--cui-warning'),
      pointHoverBorderColor: getStyle('--cui-warning'),
      data: [78, 81, 80, 45, 34, 12, 40],
      fill: true
    }], [{
      label: 'My Fourth dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
      barPercentage: 0.7
    }]
  ];
  optionsDefault = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          display: false
        }
      },
      y: {
        min: 30,
        max: 89,
        display: false,
        grid: {
          display: false
        },
        ticks: {
          display: false
        }
      }
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };

  // Expense Report
  expenseReportColoums: any[] = [];
  years: number[] = [];
  selectedDate!: string;
  selectedYear!: number;
  // Asset Report
  assetReportColoums: any[] = [];
  assetReportPie: any[] = [];
  // Resource Report
  resourceClusteredColumns: ResourceMonthReportModel[] = [];

  resourceChartSeries = [
    { name: "Inflow", fieldName: "inflow" },
    { name: "Outflow", fieldName: "outflow" },
    { name: "Net Income", fieldName: "netIncome" }
  ];
  reportForm = new FormGroup({
    type: new FormControl('month')
  });
  constructor(private expenseReportService: ExpenseReportService,
    private assetReportService: AssetReportService,
    private resourceReportService: ResourceReportService,
    private auth: AuthService) { }

  ngOnInit(): void {
    // Set default date to today for create form
    const today = new Date();
    const year = today.getFullYear();
    for (let i = year; i >= year - 4; i--) {
      this.years.push(i);
    }

    today.setMonth(today.getMonth() - 1);
    this.selectedDate = today.toISOString().substring(0, 7);
    this.selectedYear = year;
    this.auth.getCurrentUserInfor().subscribe(user => {
      if (user) {
        this.userInfor = user;
        this.loadExpeseColoumChart('month');
        this.loadAssetColoumChart();
        this.loadResourceReport();
      }
    });

    this.setData();

  }
  //#region Eexpense report
  private loadExpeseColoumChart(type: string): void {
    if (type === 'year') {
      this.expenseReportService.getColoumnChartByYear(this.userInfor.userId, this.selectedYear).subscribe(response => {
        this.expenseReportColoums = response.data;
      });
    } else {
      this.expenseReportService.getColoumnChartByMonth(this.userInfor.userId, this.selectedDate).subscribe(response => {
        this.expenseReportColoums = response.data;
      });
    }

  }
  onDateChange(event: any): void {
    this.selectedDate = event.target.value;
    this.loadExpeseColoumChart('month');
  }

  onYearChange(event: any): void {
    this.selectedYear = event.target.value;
    this.loadExpeseColoumChart('year');
  }

  setRadioValue(value: string): void {
    this.reportForm.setValue({ type: value });
    this.loadExpeseColoumChart(value);
  }
  //#endregion
  //#region Asset report
  private loadAssetColoumChart(): void {
    // To do
    this.assetReportService.getColoumnChart(this.userInfor.userId).subscribe(response => {
      this.assetReportColoums = response.data;
    });
    this.assetReportService.getPieChart(this.userInfor.userId).subscribe(response => {
      this.assetReportPie = response.data;
    });
  }
  //#endregion
  //#region Resource report
  private loadResourceReport(): void {
    this.resourceReportService.getClusteredColumnChart(this.userInfor.userId, this.selectedYear).subscribe(response => {
      // Handle response data
      if (response.success) {
        this.resourceClusteredColumns = response.data;
      }
    });
  }
  //#endregion

  setData() {
    for (let idx = 0; idx < 4; idx++) {
      this.data[idx] = {
        labels: idx < 3 ? this.labels.slice(0, 7) : this.labels,
        datasets: this.datasets[idx]
      };
    }
    this.setOptions();
    console.log(this.options);
    console.log(this.data);
  }

  setOptions() {
    for (let idx = 0; idx < 4; idx++) {
      const options = JSON.parse(JSON.stringify(this.optionsDefault));
      switch (idx) {
        case 0: {
          this.options.push(options);
          break;
        }
        case 1: {
          options.scales.y.min = -9;
          options.scales.y.max = 39;
          options.elements.line.tension = 0;
          this.options.push(options);
          break;
        }
        case 2: {
          options.scales.x = { display: false };
          options.scales.y = { display: false };
          options.elements.line.borderWidth = 2;
          options.elements.point.radius = 0;
          this.options.push(options);
          break;
        }
        case 3: {
          options.scales.x.grid = { display: false, drawTicks: false };
          options.scales.x.grid = { display: false, drawTicks: false, drawBorder: false };
          options.scales.y.min = undefined;
          options.scales.y.max = undefined;
          options.elements = {};
          this.options.push(options);
          break;
        }
      }
    }
  }
}