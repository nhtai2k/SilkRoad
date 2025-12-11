import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColoumnChartComponent } from "@components/charts/coloumn-chart/coloumn-chart.component";
import { CardBodyComponent, CardComponent, CardHeaderComponent } from '@coreui/angular';
import { ReportService } from '@services/personal-finance-services';
import { AuthService } from '@services/system-services';

@Component({
  selector: 'app-reports',
  imports: [ColoumnChartComponent, CardComponent, CardBodyComponent, CardHeaderComponent, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  data: any[] = [];
  selectedDate: string = '2025-11';
  
  constructor(private reportService: ReportService, private auth: AuthService) {}
  
  ngOnInit(): void {
    this.loadData();
  }

  onDateChange(event: any): void {
    this.selectedDate = event.target.value;
    this.loadData();
  }

  private loadData(): void {
    this.auth.getCurrentUserInfor().subscribe(user => {
      const userId = user?.userId;
      if (userId) {
        this.reportService.getColoumnChartByMonth(userId, this.selectedDate).subscribe(response => {
          this.data = response.data;
          console.log('Column Chart Data:', this.data);
        });
      }
    });
  }
}