// Component data
chartData = [
  { year: "2021", europe: 2.5, namerica: 2.5, asia: 2.1, lamerica: 1 },
  { year: "2022", europe: 2.6, namerica: 2.7, asia: 2.2, lamerica: 0.5 },
  { year: "2023", europe: 2.8, namerica: 2.9, asia: 2.4, lamerica: 0.3 }
];

seriesConfig = [
  { name: "Europe", fieldName: "europe", stacked: false },
  { name: "North America", fieldName: "namerica", stacked: true },
  { name: "Asia", fieldName: "asia", stacked: false },
  { name: "Latin America", fieldName: "lamerica", stacked: true }
];

<app-stacked-clustered-column-chart
  [data]="chartData"
  [seriesConfig]="seriesConfig"
  [id]="1"
  [showLegend]="true">
</app-stacked-clustered-column-chart>