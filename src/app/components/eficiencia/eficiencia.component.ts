import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-eficiencia',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './eficiencia.component.html',
  styleUrl: './eficiencia.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EficienciaComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Eficácia das Campanhas de Vacinação',
    },
    xAxis: { categories: [] },
    yAxis: [
      {
        title: {
          text: 'Número de Casos',
        },
      },
      {
        title: {
          text: 'Número de Doses',
        },
      },
    ],
    series: [
      {
        name: 'Casos',
        data: [],
        type: 'line',
        color: '#434348',
        yAxis: 1,
      },
      {
        name: 'Doses de imunobiológicos aplicadas',
        data: [],
        type: 'line',
        color: '#7cb5ec',
        yAxis: 2,
      },
    ],
  };

  @Input('dados') dados: { key: string; casos: number; doses: number }[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);

    if (changes['dados'] && changes['dados'].currentValue) {
      this.updateChart(changes['dados'].currentValue);
    }
  }
  getDataByYear(year: string) {
    const a = data2.find((val) => val.ano === +year);
    if (a) {
      return a.totalvacinados;
    }
    return 0;
  }

  updateChart(dados: { key: string; casos: number; doses: number }[]) {
    this.chartOptions = {
      ...this.chartOptions,
      xAxis: {
        categories: dados.map((item) => item.key).slice(0, dados.length - 1),
      },
      series: [
        {
          name: 'Casos',
          data: dados.map((item) => item.casos).slice(0, dados.length - 1),
          type: 'line',
          color: '#434348',
        },
        {
          name: 'Doses de imunobiológicos aplicadas',
          data: dados
            .slice(0, dados.length - 1)
            .map((item) => this.getDataByYear(item.key)),
          type: 'line',
          color: '#7cb5ec',
        },
      ],
    };
  }
}

export const data2 = [
  {
    ano: 1995,
    totalcasos: 4,
    totalvacinados: 2327064.0,
  },
  {
    ano: 1996,
    totalcasos: 14,
    totalvacinados: 2013918.0,
  },
  {
    ano: 1997,
    totalcasos: 3,
    totalvacinados: 2539660.0,
  },
  {
    ano: 1998,
    totalcasos: 34,
    totalvacinados: 11881988.0,
  },
  {
    ano: 1999,
    totalcasos: 74,
    totalvacinados: 16123233.0,
  },
  {
    ano: 2000,
    totalcasos: 79,
    totalvacinados: 22367455.0,
  },
  {
    ano: 2001,
    totalcasos: 41,
    totalvacinados: 13693626.0,
  },
  {
    ano: 2002,
    totalcasos: 14,
    totalvacinados: 4435823.0,
  },
  {
    ano: 2003,
    totalcasos: 66,
    totalvacinados: 5227862.0,
  },
  {
    ano: 2004,
    totalcasos: 5,
    totalvacinados: 4308851.0,
  },
  {
    ano: 2005,
    totalcasos: 3,
    totalvacinados: 4712897.0,
  },
  {
    ano: 2006,
    totalcasos: 2,
    totalvacinados: 4257567.0,
  },
  {
    ano: 2007,
    totalcasos: 14,
    totalvacinados: 5362134.0,
  },
  {
    ano: 2008,
    totalcasos: 46,
    totalvacinados: 17167454.0,
  },
  {
    ano: 2009,
    totalcasos: 47,
    totalvacinados: 10417238.0,
  },
  {
    ano: 2010,
    totalcasos: 2,
    totalvacinados: 6712319.0,
  },
  {
    ano: 2011,
    totalcasos: 2,
    totalvacinados: 6691068.0,
  },
  {
    ano: 2013,
    totalcasos: 3,
    totalvacinados: 5550605.0,
  },
  {
    ano: 2014,
    totalcasos: 1,
    totalvacinados: 4839167.0,
  },
  {
    ano: 2015,
    totalcasos: 9,
    totalvacinados: 5605855.0,
  },
  {
    ano: 2016,
    totalcasos: 51,
    totalvacinados: 6255944.0,
  },
  {
    ano: 2017,
    totalcasos: 807,
    totalvacinados: 24602876.0,
  },
  {
    ano: 2018,
    totalcasos: 1308,
    totalvacinados: 14478001.0,
  },
  {
    ano: 2019,
    totalcasos: 90,
    totalvacinados: 8052571.0,
  },
  {
    ano: 2020,
    totalcasos: 18,
    totalvacinados: 10029115.0,
  },
  {
    ano: 2021,
    totalcasos: 11,
    totalvacinados: 7004204.0,
  },
  {
    ano: 2022,
    totalcasos: 4,
    totalvacinados: 7426422.0,
  },
  {
    ano: 2023,
    totalcasos: 6,
    totalvacinados: NaN,
  },
];
