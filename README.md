# Análise Descritiva — Febre Amarela

> Dashboard em Angular para explorar **casos e vacinação de febre amarela no Brasil**: distribuição por região, faixa etária e sexo, mapa de calor geográfico e indicadores de eficiência.

![Angular](https://img.shields.io/badge/Angular-16-DD0031?logo=angular&logoColor=white)
![Highcharts](https://img.shields.io/badge/Highcharts-charts-8087E8)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue)

## Visão geral

Aplicação de análise descritiva que cruza dados de **casos confirmados** e **doses aplicadas** para visualizar padrões espaciais e demográficos da febre amarela. As visualizações cobrem:

- **Distribuição por região** e por **faixa etária/sexo**;
- **Mapa de calor** geográfico dos casos (latitude/longitude por município);
- **Indicadores de eficiência** entre vacinação e incidência;
- Filtros interativos por período e recorte.

## Stack

`Angular 16` · `TypeScript` · `Highcharts` (+ highcharts-more) · `PapaParse` · `RxJS`

## Componentes

| Componente | Papel |
|---|---|
| `chart` | Gráficos descritivos (séries temporais, barras) |
| `heat` | Mapa de calor geográfico dos casos |
| `regiao` | Recorte por região do Brasil |
| `eficiencia` | Relação vacinação × incidência |
| `filter` | Filtros interativos |

## Dados

Os arquivos em `src/assets/` (`doses.json`, `geo-cases.json`) contêm **dados públicos agregados** (doses por município/ano e casos por município) — sem informações pessoais identificáveis. Fonte: dados abertos de saúde pública.

## Como rodar

```bash
npm install
ng serve
# abra http://localhost:4200
```

## Licença

[MIT](LICENSE) © João Leão
