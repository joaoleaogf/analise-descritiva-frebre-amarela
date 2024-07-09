import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

import HC_heatmap from 'highcharts/modules/heatmap';
import HC_map from 'highcharts/modules/map';

// Load Highcharts modules
HC_heatmap(Highcharts);
HC_map(Highcharts);

@Component({
  selector: 'app-heat',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  template: `<highcharts-chart
    [Highcharts]="Highcharts"
    [options]="chartOptions"
    style="width: 100%; height: 600px; display: block;"
  ></highcharts-chart>`,
  styleUrls: ['./heat.component.css'],
})
export class HeatComponent implements OnChanges {
  @Input('dados') dados: {
    latitude: number;
    longitude: number;
    casos: number;
  }[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  constructor() {
    this.init();
  }

  async init() {
    const topology = await fetch(
      'https://code.highcharts.com/mapdata/custom/world.topo.json',
    ).then((response) => response.json());

    this.chartOptions = {
      chart: {
        map: topology,
      },
      title: {
        text: 'Heatmap de Casos de Febre Amarela no Brasil',
        align: 'left',
      },
      colorAxis: {
        min: 0,
        max: 15,
        minColor: 'rgba(0, 34, 255, 0.1)',
        maxColor: 'rgba(0, 34, 255, 1)',
      },
      series: [
        {
          name: 'world',
          borderColor: 'rgba(0, 0, 0, 0.4)',
          type: 'geoheatmap',
          states: {
            inactive: {
              enabled: false,
            },
          },
          accessibility: {
            exposeAsGroupOnly: true,
          },
        },
        {
          type: 'geoheatmap',
          name: 'Train Stations Near Airports',
          opacity: 0.7,
          colsize: 5,
          rowsize: 5,
          borderWidth: 1,
          interpolation: {
            enabled: true,
            blur: 2,
          },
          data: [],
        },
      ],
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dados'] && changes['dados'].currentValue) {
      this.updateChart(changes['dados'].currentValue);
    }
  }

  updateChart(dados: { latitude: number; longitude: number; casos: number }[]) {
    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          data: dados.map((item) => ({
            lat: item.latitude,
            lon: item.longitude,
            value: item.casos,
          })),
          name: 'Casos',
          borderWidth: 1,
          dataLabels: {
            enabled: true,
            color: '#000000',
          },
          type: 'heatmap',
        },
      ],
    };
  }
}
