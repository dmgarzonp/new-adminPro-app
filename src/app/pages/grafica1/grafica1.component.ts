import { Component } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component{

  //Ventas
  public labelsVentas: string[] = ['Pan','Uvas','Choclos'];
  public dataVentas: ChartData<'doughnut'> = {
    labels: this.labelsVentas,
    datasets: [{
      data: [ 950, 510, 230 ],
      backgroundColor: ['#99a4df','#009FEE','#1835ca'],
      hoverBackgroundColor:  ['#99a4df','#009FEE','#1835ca'],
      hoverBorderColor: ['#99a4df','#009FEE','#1835ca'],
    }]
  }

  //Compras
  public labelsCompras: string[] = ['Chevrolet','Fiat','Jeep'];
  public dataCompras: ChartData<'doughnut'> = {
    labels: this.labelsCompras,
    datasets: [{
      data: [ 7, 10, 34 ],
      backgroundColor: ['#99a4df','#009FEE','#1835ca'],
      hoverBackgroundColor:  ['#99a4df','#009FEE','#1835ca'],
      hoverBorderColor: ['#99a4df','#009FEE','#1835ca'],
    }]
  }


  //Asignaciones
  public labelsAsign: string[] = ['Sueldos','P.Basicos','Proveedores'];
  public dataAsign: ChartData<'doughnut'> = {
    labels: this.labelsAsign,
    datasets: [{
      data: [ 24, 90, 76 ],
      backgroundColor: ['#99a4df','#009FEE','#1835ca'],
      hoverBackgroundColor:  ['#99a4df','#009FEE','#1835ca'],
      hoverBorderColor: ['#99a4df','#009FEE','#1835ca'],
    }]
  }

  //Descuentos

}
