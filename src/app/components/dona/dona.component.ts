import { Component, Input} from '@angular/core';
import { ChartData, ChartType } from 'chart.js';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {

  //Se envia cuando no haya nada que mostrar SIN TITULO
  @Input() title: string = 'Sin titulo';

  // Se Mostraran Labe1, Label2.. Cuanda no haya que mostrar
  @Input('labels') doughnutChartLabels: string[] = [ 'Label1', 'Label2', 'Label3' ];

  //Se mostraran estos datos con sus colores Cundo no haya datos que mostrar
  @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: [ 350, 450, 100 ],
      },
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

}
