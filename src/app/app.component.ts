import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IFiltro } from './models/filter';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  chartOptionsMap: { [key: string]: Highcharts.Options } = {
    chart1: {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Distribuição Temporal dos Casos',
      },
      xAxis: {
        categories: temp.map((v) => `${v.Ano}`),
      },
      yAxis: {
        title: {
          text: 'Número de Casos',
        },
      },
      series: [
        {
          type: 'line',
          data: temp.map((v) => v.NumeroCasos),
          name: 'Casos',
        },
      ],
    },
    chart2: {
      chart: {
        type: 'line',
      },
      title: {
        text: 'Padrões Sazonais na Incidência da Febre Amarela',
      },
      xAxis: {
        categories: categories,
      },
      series: [
        {
          name: 'Casos',
          data: values,
          type: 'line',
        },
      ],
    },
    correlacao: {
      chart: {
        type: 'scatter',
      },
      title: {
        text: 'Correlação entre Idade e Início dos Sintomas',
      },
      xAxis: {
        title: {
          text: 'Idade (anos)',
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true,
      },
      yAxis: {
        title: {
          text: 'Casos Epidemiológicos',
        },
      },
      legend: {},
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: 'rgb(100,100,100)',
              },
            },
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x} anos, {point.y} casos',
          },
        },
      },
      series: [
        {
          name: 'Casos',
          color: '#7cb5ec',
          type: 'scatter',
          data: [
            [30, 15],
            [32, 17],
            [28, 20],
            [25, 25],
            [27, 18],
            [40, 30],
            [35, 22],
            [45, 27],
            [50, 10],
          ],
        },
      ],
    },
    faixaEtariaSexo: {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Distribuição de Casos por Faixa Etária e Sexo',
      },
      xAxis: {
        categories: [
          '0-10',
          '11-20',
          '21-30',
          '31-40',
          '41-50',
          '51-60',
          '61+',
        ],
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Número de Casos',
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: 'black',
          },
        },
      },
      legend: {},
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}',
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [
        {
          name: 'Masculino',
          data: [15, 5, 10, 20, 25, 10, 5],
          type: 'column',
          color: '#434348',
        },
        {
          name: 'Feminino',
          data: [10, 5, 15, 10, 20, 15, 10],
          type: 'column',
          color: '#7cb5ec',
        },
      ],
    },
  };

  dataMap: { [key: string]: any } = {};

  private filter: IFiltro = {};

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.onFIlterApplied({});
  }

  async onFIlterApplied(filter: IFiltro) {
    this.filter = filter;

    const regiaoData = await this.dataService.getRegiaoData(this.filter);
    this.dataMap['regiao'] = regiaoData;

    const eficienciaData = await this.dataService.getEficienciaData(
      this.filter,
    );
    this.dataMap['eficiencia'] = eficienciaData;

    const heatmapData = await this.dataService.getHeatmapData();
    this.dataMap['heatmap'] = heatmapData;
  }
}

export const categories = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

export const values = [
  71.11111111111111, 30.85, 19.75, 9.68421052631579, 3.0625, 1.7857142857142858,
  1.2222222222222223, 1.2857142857142858, 1.2857142857142858, 1.0, 1.5,
  12.615384615384615,
];

const temp = [
  {
    Ano: 1995,
    NumeroCasos: 4,
  },
  {
    Ano: 1996,
    NumeroCasos: 15,
  },
  {
    Ano: 1997,
    NumeroCasos: 3,
  },
  {
    Ano: 1998,
    NumeroCasos: 34,
  },
  {
    Ano: 1999,
    NumeroCasos: 75,
  },
  {
    Ano: 2000,
    NumeroCasos: 85,
  },
  {
    Ano: 2001,
    NumeroCasos: 41,
  },
  {
    Ano: 2002,
    NumeroCasos: 14,
  },
  {
    Ano: 2003,
    NumeroCasos: 66,
  },
  {
    Ano: 2004,
    NumeroCasos: 5,
  },
  {
    Ano: 2005,
    NumeroCasos: 3,
  },
  {
    Ano: 2006,
    NumeroCasos: 2,
  },
  {
    Ano: 2007,
    NumeroCasos: 14,
  },
  {
    Ano: 2008,
    NumeroCasos: 46,
  },
  {
    Ano: 2009,
    NumeroCasos: 45,
  },
  {
    Ano: 2010,
    NumeroCasos: 2,
  },
  {
    Ano: 2011,
    NumeroCasos: 2,
  },
  {
    Ano: 2013,
    NumeroCasos: 3,
  },
  {
    Ano: 2014,
    NumeroCasos: 1,
  },
  {
    Ano: 2015,
    NumeroCasos: 9,
  },
  {
    Ano: 2016,
    NumeroCasos: 51,
  },
  {
    Ano: 2017,
    NumeroCasos: 805,
  },
  {
    Ano: 2018,
    NumeroCasos: 1306,
  },
  {
    Ano: 2019,
    NumeroCasos: 90,
  },
  {
    Ano: 2020,
    NumeroCasos: 18,
  },
  {
    Ano: 2021,
    NumeroCasos: 11,
  },
  {
    Ano: 2022,
    NumeroCasos: 4,
  },
  {
    Ano: 2023,
    NumeroCasos: 6,
  },
];
