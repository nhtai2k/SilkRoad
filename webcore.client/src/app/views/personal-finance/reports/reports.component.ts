
import { FormsModule } from '@angular/forms';
import { ColoumnChartComponent } from "@components/charts/coloumn-chart/coloumn-chart.component";
import { CardBodyComponent, CardComponent, CardHeaderComponent, FormSelectDirective } from '@coreui/angular';
import { AssetReportService, ExpenseReportService } from '@services/personal-finance-services';
import { AuthService } from '@services/system-services';


import { DOCUMENT, NgStyle } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartOptions } from 'chart.js';
import {
  AvatarComponent,
  ButtonDirective,
  ButtonGroupComponent,
  CardFooterComponent,
  ColComponent,
  FormCheckLabelDirective,
  GutterDirective,
  ProgressBarDirective,
  ProgressComponent,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { IconDirective } from '@coreui/icons-angular';

import { WidgetsBrandComponent } from '../../widgets/widgets-brand/widgets-brand.component';
import { WidgetsDropdownComponent } from '../../widgets/widgets-dropdown/widgets-dropdown.component';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import { PieChartComponent } from "@components/charts";


@Component({
  selector: 'app-reports',
  imports: [ColoumnChartComponent, CardComponent, CardBodyComponent, CardHeaderComponent, FormsModule,
    WidgetsDropdownComponent, TextColorDirective, ButtonDirective, IconDirective, ButtonGroupComponent,
    //RowComponent, ColComponent, , ,
    ReactiveFormsModule, FormCheckLabelDirective, FormSelectDirective, PieChartComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
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

  reportForm = new FormGroup({
    type: new FormControl('month')
  });
  constructor(private expenseReportService: ExpenseReportService,
    private assetReportService: AssetReportService,
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
}