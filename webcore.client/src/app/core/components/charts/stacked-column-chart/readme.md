// Component data
stackedData = [
  { quarter: "Q1 2023", revenue: 150, costs: 80, profit: 70 },
  { quarter: "Q2 2023", revenue: 180, costs: 90, profit: 90 },
  { quarter: "Q3 2023", revenue: 200, costs: 100, profit: 100 }
];

stackedSeries = [
  { name: "Revenue", fieldName: "revenue", color: "#5BA0F2" },
  { name: "Costs", fieldName: "costs", color: "#FF6B6B" },
  { name: "Profit", fieldName: "profit", color: "#4ECDC4" }
];
<app-stacked-column-chart
  [data]="stackedData"
  [seriesConfig]="stackedSeries"
  [categoryField]="'quarter'"
  [id]="1"
  [chartTitle]="'Financial Overview'"
  [showLegend]="true"
  [showDataLabels]="true">
</app-stacked-column-chart>