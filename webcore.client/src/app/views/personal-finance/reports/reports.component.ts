
import { FormsModule } from '@angular/forms';
import { ColoumnChartComponent } from "@components/charts/coloumn-chart/coloumn-chart.component";
import { CardBodyComponent, CardComponent, CardHeaderComponent, FormSelectDirective } from '@coreui/angular';
import { ReportService } from '@services/personal-finance-services';
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


@Component({
  selector: 'app-reports',
  imports: [ColoumnChartComponent, CardComponent, CardBodyComponent, CardHeaderComponent, FormsModule,
    WidgetsDropdownComponent, TextColorDirective, ButtonDirective, IconDirective, ButtonGroupComponent,
    //RowComponent, ColComponent, , ,
    ReactiveFormsModule, FormCheckLabelDirective, FormSelectDirective],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  data: any[] = [];
  years: number[] = [];
  selectedDate!: string;
  selectedYear!: number;
  
  reportForm = new FormGroup({
    type: new FormControl('month')
  });
  constructor(private reportService: ReportService, private auth: AuthService) { }

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
    this.loadChart('month');
  }

  private loadChart(type: string): void {
    this.auth.getCurrentUserInfor().subscribe(user => {
      if (user) {
        if (type === 'year') {
          this.reportService.getColoumnChartByYear(user.userId, this.selectedYear).subscribe(response => {
            this.data = response.data;
          });
        } else {
          this.reportService.getColoumnChartByMonth(user.userId, this.selectedDate).subscribe(response => {
            this.data = response.data;
          });
        }
      }
    });
  }
  onDateChange(event: any): void {
    this.selectedDate = event.target.value;
    this.loadChart('month');
  }

  onYearChange(event: any): void {
    this.selectedYear = event.target.value;
    this.loadChart('year');
  }

  setRadioValue(value: string): void {
    this.reportForm.setValue({ type: value });
    this.loadChart(value);
  }

}