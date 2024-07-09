import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-regiao-chart',
  templateUrl: './regiao.component.html',
  standalone: true,
  imports: [HighchartsChartModule],
  styleUrls: ['./regiao.component.css'],
})
export class RegiaoChartComponent implements OnChanges {
  @Input('dados') dados: { key: string; casos: number }[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Distribuição de Casos por Região',
    },
    xAxis: {
      categories: [],
    },
    yAxis: {
      title: {
        text: 'Casos',
      },
    },
    series: [
      {
        name: 'Casos',
        type: 'column',
        data: [],
        color: '#7cb5ec',
      },
    ],
    plotOptions: {
      column: {
        cursor: 'pointer',
        point: {
          events: {
            click: (event) => this.onPointClick(event),
          },
        },
      },
    },
  };

  getCategories(dados: { key: string; casos: number }[]) {
    if (dados && dados.length > 0) {
      return dados.map((item) => item.key);
    }
    return [];
  }

  getSeries(dados: { key: string; casos: number }[]) {
    if (dados && dados.length > 0) {
      return dados.map((item) => item.casos);
    }
    return [];
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);

    if (changes['dados'] && changes['dados'].currentValue) {
      this.updateChart(changes['dados'].currentValue);
    }
  }

  onPointClick(event: any): void {
    const regiaoSelecionada = event.point.category;
  }

  updateChart(dados: { key: string; casos: number }[]): void {
    console.log('updateChart', this.getSeries(dados));

    this.chartOptions = {
      ...this.chartOptions,
      xAxis: {
        categories: this.getCategories(dados),
      },
      series: [
        {
          name: 'Casos',
          type: 'column',
          data: this.getSeries(dados),
        },
      ],
      title: {
        text: 'Distribuição de Casos por Região',
      },
    };
  }
}
