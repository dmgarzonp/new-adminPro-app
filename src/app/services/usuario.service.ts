import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-forms.interface';
import { Usuario } from '../models/usuario.model';

declare const google: any;


//Conectividad al api
const base_url = environment.base_url;

//almacenar la informacion delñ usuario


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //almacenar informacion   de usuario
  public usuario: Usuario;

  constructor( private http: HttpClient,
               private router: Router) { }



get token(): string {
  return localStorage.getItem('token') || '';
}


get uid(): string {
  return this.usuario.uid || '';
}


  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map( (resp: any) => {
        console.log(resp);
        const { email, google, nombre, role, uid, img='' } = resp.usuario;

        this.usuario = new Usuario(nombre, email, '', img, google, role, uid );
        localStorage.setItem('token', resp.token);
        return true;
      }),

      catchError( error => of(false))

    );
  }

  crearUsuario( formData: RegisterForm){
    return this.http.post(`${ base_url}/usuarios`, formData)
                .pipe(
                  tap( (resp: any) => {
                  localStorage.setItem('token', resp.token)
                  })
                )
  }



  actualizarPerfil( data: { email: string, nombre: string, role: string}){

    data = {
      ...data,
      role: this.usuario.role
    };

   return this.http.put(`${ base_url}/usuarios/${ this.uid}`, data, {
      headers: {
        'x-token': this.token
      }
    })

  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap( (resp: any) => {
                   localStorage.setItem('token', resp.token)
                  })
                )
  }


  loginGoogle( token: string){
    return this.http.post(`${ base_url}/login/google`, { token })
                .pipe(
                  tap( (resp: any) => {
                    //console.log(resp);
                    localStorage.setItem('token', resp.token)
                   })
                )
  }


  logout(){
    localStorage.removeItem('token');

    google.accounts.id.revoke( 'garzonpillajodavid@gmail.com', () => {
      this.router.navigateByUrl('/login');

    } )
  }


}
