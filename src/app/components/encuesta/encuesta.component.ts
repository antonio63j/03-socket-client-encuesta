import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { EncuestaService } from '../../services/encuesta.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
})
export class EncuestaComponent implements OnInit, OnDestroy {
  public barChartOptions: any = {
    responsive: true,
    scaleShowVerticalLines: false

  };
  public barChartLabels: Label[] = ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

   public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Entrevistados' }
  ];

  suscripcionCambiosEncuesta: Subscription;
  suscripcionCargaEncuesta: Subscription;

  constructor(
    private encuestaService: EncuestaService,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {

    // primero hacemos la carga de la grafica
    this.suscripcionCargaEncuesta = this.httpClient.get(environment.wsUrl + '/grafica' ).subscribe (msg => {
      this.barChartData = (msg as ChartDataSets []);
    }

    );

    // nos suscribimos a los cambios
    this.suscripcionCambiosEncuesta = this.encuestaService.escucharMensajeBroadcast('actualizacion-encuesta').subscribe (msg => {
      console.log('leido broadcast' + JSON.stringify(msg));
      this.barChartData = (msg as ChartDataSets []);
    }
      );
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  ngOnDestroy(): void {
     this.suscripcionCambiosEncuesta.unsubscribe();
     this.suscripcionCargaEncuesta.unsubscribe();

  }
}
