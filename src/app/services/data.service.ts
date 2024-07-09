import { Injectable } from '@angular/core';
import { IFiltro } from '../models/filter';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';

interface IGeoCase {
  municipio: string;
  estado: string;
  mes: number;
  ano: number;
  sexo: string;
  idade: string;
  numeroCasos: number;
  região: string;
  latitude: number;
  longitude: number;
}

interface IDoses {
  estado: string;
  mes: number;
  ano: number;
  doses: number;
  região: string;
}

@Injectable({
  providedIn: 'root',
  deps: [HttpClientModule],
})
export class DataService {
  private readonly casosDataUrl = './assets/geo-cases.json';
  private readonly dosesDataUrl = './assets/doses.json';

  constructor(private http: HttpClient) {}

  getRegiaoData(
    filter: IFiltro = {},
  ): Promise<{ key: string; casos: number }[]> {
    return firstValueFrom(
      this.http.get<IGeoCase[]>(this.casosDataUrl).pipe(
        map((data: IGeoCase[]) => {
          return data
            .filter((item) => {
              return (
                (!filter.ano || item.ano === filter.ano) &&
                (!filter.regiao || item['região'] === filter.regiao) &&
                (!filter.estado || item.estado === filter.estado) &&
                (!filter.idade || item.idade === filter.idade) &&
                (!filter.genero || item.sexo === filter.genero)
              );
            })
            .reduce(
              (acc, curr) => {
                const key = filter.regiao
                  ? filter.estado
                    ? `${curr.municipio}`
                    : `${curr.estado}`
                  : curr['região'];
                if (!acc[key]) {
                  acc[key] = 0;
                }
                acc[key] += curr.numeroCasos;
                return acc;
              },
              {} as { [key: string]: number },
            );
        }),
        map((result) =>
          Object.keys(result).map((key) => ({ key, casos: result[key] })),
        ),
      ),
    );
  }

  async getEficienciaData(
    filter: IFiltro = {},
  ): Promise<{ key: string; casos: number; doses: number }[]> {
    const casos$ = this.http.get<IGeoCase[]>(this.casosDataUrl);
    const doses$ = this.http.get<IDoses[]>(this.dosesDataUrl);

    const [casos, doses] = await Promise.all([
      firstValueFrom(casos$),
      firstValueFrom(doses$),
    ]);

    const filteredCasos = casos.filter((item) => {
      return (
        (!filter.ano || item.ano === filter.ano) &&
        (!filter.regiao || item['região'] === filter.regiao) &&
        (!filter.estado || item.estado === filter.estado) &&
        (!filter.idade || item.idade === filter.idade) &&
        (!filter.genero || item.sexo === filter.genero)
      );
    });

    const filteredDoses = doses.filter((item) => {
      return (
        (!filter.ano || item.ano === filter.ano) &&
        (!filter.regiao || item['região'] === filter.regiao) &&
        (!filter.estado || item.estado === filter.estado)
      );
    });

    const combinedData = filteredCasos.reduce(
      (acc, curr) => {
        const key = filter.ano
          ? curr.mes
            ? `${curr.ano}-${curr.mes}`
            : `${curr.ano}`
          : `${curr.ano}`;
        if (!acc[key]) {
          acc[key] = { casos: 0, doses: 0 };
        }
        acc[key].casos += curr.numeroCasos;
        return acc;
      },
      {} as { [key: string]: { casos: number; doses: number } },
    );

    console.log('combinedData', combinedData);

    filteredDoses.forEach((dose) => {
      const key = filter.ano
        ? dose.mes
          ? `${dose.ano}-${dose.mes}`
          : `${dose.ano}`
        : `${dose.ano}`;
      if (!combinedData[key]) {
        combinedData[key] = { casos: 0, doses: 0 };
      }
      combinedData[key].doses += dose.doses;
    });

    return Object.keys(combinedData).map((key) => ({
      key,
      casos: combinedData[key].casos,
      doses: combinedData[key].doses,
    }));
  }

  getHeatmapData() {
    return firstValueFrom(
      this.http.get<IGeoCase[]>(this.casosDataUrl).pipe(
        map((data: IGeoCase[]) => {
          return data.map((item) => ({
            latitude: item.latitude,
            longitude: item.longitude,
            casos: item.numeroCasos,
            municipio: item.municipio,
          }));
        }),
      ),
    );
  }
}
