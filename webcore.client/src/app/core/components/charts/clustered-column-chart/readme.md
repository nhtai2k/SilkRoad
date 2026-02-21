// In your parent component
chartData = [
  { year: "2021", europe: 2.5, namerica: 2.5, asia: 2.1 },
  { year: "2022", europe: 2.6, namerica: 2.7, asia: 2.2 },
  { year: "2023", europe: 2.8, namerica: 2.9, asia: 2.4 }
];

chartSeries = [
  { name: "Europe", fieldName: "europe" },
  { name: "North America", fieldName: "namerica" },
  { name: "Asia", fieldName: "asia" }
];

<app-clustered-column-chart
  [data]="chartData"
  [series]="chartSeries"
  [id]="1"
  categoryField="year"
  [showLegend]="true">
</app-clustered-column-chart>