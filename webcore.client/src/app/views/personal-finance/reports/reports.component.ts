import { Component } from '@angular/core';
import { ColoumnChartComponent } from "@components/charts/coloumn-chart/coloumn-chart.component";

@Component({
  selector: 'app-reports',
  imports: [ColoumnChartComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

}