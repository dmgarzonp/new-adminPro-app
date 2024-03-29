import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, retry, take } from "rxjs/operators";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public interbaloSubs$: Subscription;


  constructor() {

   /*  this.retormaObservable().pipe(
      retry(1)
    ).subscribe(
      valor => console.log('subs:', valor),
      error => console.warn('Error:', error),
      () =>  console.info('Obs terminado')

    ); */

    this.interbaloSubs$ = this.retornaIntervalo().subscribe(console.log)

   }
  ngOnDestroy(): void {
    this.interbaloSubs$.unsubscribe();
  }

   retornaIntervalo(): Observable<number>{
    return interval(500)
        .pipe(
          //take(10),
          map( valor => valor +1),
          filter( valor => ( valor % 2 === 0) ? true: false),
      )
   }


   retormaObservable(): Observable<number>{
    let i = -1

    return new Observable<number>( observer => {
      const intervalo =  setInterval( () => {
       i++;
       observer.next(i);
       if (i === 4) {
        clearInterval( intervalo );
        observer.complete();
       }

       if (i === 2) {
        observer.error('i llego al valor de 2')
       }
      }, 1000)
    });


   }
}
