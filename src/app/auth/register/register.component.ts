import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForms: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required],
  }, {
    validators: this.passwordIguales('password', 'password2')
  });


  constructor( private fb: FormBuilder,
               private usuarioService: UsuarioService,
               private router: Router) { }


  crearUsuario(){
    this.formSubmitted = true;
    console.log(this.registerForms.value);

    if (this.registerForms.invalid) {
       return;
    }

    //Realizar el posteo o la creacion de usuario
    this.usuarioService.crearUsuario( this.registerForms.value)
                        .subscribe( resp => {
                          // Navegar al Dashboar
                          this.router.navigateByUrl('/');

                        }, (err) => {
                          //Si sucede un error
                          Swal.fire('Error', err.error.msg, 'error');

                        });
  }



  campoNoValido( campo: string): boolean{
    if (this.registerForms.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  contraseniasNoValidas(){
    const pass1 = this.registerForms.get('password').value;
    const pass2 = this.registerForms.get('password2').value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }
  aceptaTerminos(){
    return !this.registerForms.get('terminos').value && this.formSubmitted;
  }


  passwordIguales(pass1Name: string, pass2Name: string){

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null)
      }else {
        pass2Control.setErrors({ noEsIgual: true})
      }

    }

  }

}
