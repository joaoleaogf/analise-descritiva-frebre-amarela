import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FiltroComponent } from './filter/filter.component';
import { ChartComponent } from './chart/chart.component';
import { RegiaoChartComponent } from './components/regiao/regiao.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EficienciaComponent } from "./components/eficiencia/eficiencia.component";
import { HttpClientModule } from '@angular/common/http';
import { HeatComponent } from "./components/components/heat/heat.component";

@NgModule({
    declarations: [
        AppComponent,
        FiltroComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        ChartComponent,
        HttpClientModule,
        RegiaoChartComponent,
        FormsModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        EficienciaComponent,
        HeatComponent
    ]
})
export class AppModule { }
