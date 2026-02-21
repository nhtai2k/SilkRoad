
import { FormsModule } from '@angular/forms';
import { ColoumnChartComponent } from "@components/charts/coloumn-chart/coloumn-chart.component";
import { CardBodyComponent, CardComponent, CardHeaderComponent, FormSelectDirective } from '@coreui/angular';
import { AssetReportService, ExpenseReportService, ResourceReportService } from '@services/personal-finance-services';
import { AuthService } from '@services/system-services';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective, ButtonGroupComponent, FormCheckLabelDirective, TextColorDirective } from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { WidgetsDropdownComponent } from '../../widgets/widgets-dropdown/widgets-dropdown.component';
import { PieChartComponent, ClusteredColumnChartComponent } from "@components/charts";
import { StackedColumnChartComponent } from "@components/charts/stacked-column-chart/stacked-column-chart.component";
import { ResourceMonthReportModel } from '@models/personal-finance-models';


@Component({
  selector: 'app-reports',
  imports: [ColoumnChartComponent, CardComponent, CardBodyComponent, CardHeaderComponent, FormsModule,
    WidgetsDropdownComponent, TextColorDirective, ButtonDirective, IconDirective, ButtonGroupComponent,
    ReactiveFormsModule, FormCheckLabelDirective, FormSelectDirective, PieChartComponent, StackedColumnChartComponent, ClusteredColumnChartComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ReportsComponent implements OnInit {
  userInfor!: any;
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
      if(response.success){
        this.resourceClusteredColumns = response.data;
      }
    });
  }
  //#endregion
}