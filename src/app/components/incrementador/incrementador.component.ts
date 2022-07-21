import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{


  //@Input() progreso: number = 20;
  @Input('valor') progreso: number = 20;
  @Input() btnClass: string = 'btn-primary'

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor(valor: number) {
    this.progreso += valor;
    if (this.progreso < 0) {
      this.valorSalida.emit(0)
      this.progreso = 0;
    }
    if (this.progreso > 100) {
      this.valorSalida.emit(100)
      this.progreso = 100;
    }
    this.valorSalida.emit( this.progreso );
  }

  ngOnInit() {
    this.btnClass = `btn ${ this.btnClass }`
  }

  onChanged( nuevoValor: number){

    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if ( nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.valorSalida.emit( this.progreso );
  }
}
