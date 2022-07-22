import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  //Para asignar tema
  private  linkTheme =  document.querySelector('#theme');


  constructor() {

     //para asignar el tema
     const url = localStorage.getItem( 'theme') || `./assets/css/colors/default-dark.css`;
     this.linkTheme.setAttribute('href', url);
   }

   //Procedimiento para cambiar tema
   changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');

    links.forEach(elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working')
      }
    })
  }
}
