import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    HighchartsChartModule
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit {
  @Input() chartOptions!: Highcharts.Options;
  Highcharts: typeof Highcharts = Highcharts;

  constructor() {}

  ngOnInit(): void {}
}
