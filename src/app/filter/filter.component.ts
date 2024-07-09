import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IFiltro } from '../models/filter';

// Definindo as constantes de opções
const ANOS = [2020, 2021, 2022, 2023];
const REGIOES = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];
const ESTADOS = [
  'Amazonas',
  'Pará',
  'Acre',
  'Rondônia',
  'Roraima',
  'Amapá',
  'Tocantins',
  'Bahia',
  'Pernambuco',
  'Ceará',
  'Maranhão',
  'Paraíba',
  'Rio Grande do Norte',
  'Alagoas',
  'Sergipe',
  'Piauí',
  'Goiás',
  'Mato Grosso',
  'Mato Grosso do Sul',
  'Distrito Federal',
  'São Paulo',
  'Rio de Janeiro',
  'Minas Gerais',
  'Espírito Santo',
  'Paraná',
  'Santa Catarina',
  'Rio Grande do Sul',
];
const IDADES = ['0-17', '18-25', '26-35', '36-45', '46-60', '60+'];
const GENEROS = [
  { value: 'M', viewValue: 'Masculino' },
  { value: 'F', viewValue: 'Feminino' },
];

@Component({
  selector: 'app-filtro',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FiltroComponent implements OnInit {
  @Output('filtroAplicado') filtroAplicado = new EventEmitter<IFiltro>();

  anos = ANOS;
  regioes = REGIOES;
  estados = ESTADOS;
  idades = IDADES;
  generos = GENEROS;

  filtro: IFiltro = {};

  isExpanded = true;

  constructor() {}

  ngOnInit(): void {}

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }

  aplicarFiltro(): void {
    this.filtroAplicado.emit(this.filtro);
  }

  resetarFiltro() {
    this.filtroAplicado.emit({});
  }
}
