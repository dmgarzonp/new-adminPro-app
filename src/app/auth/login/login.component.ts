import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn: ElementRef;

  public formSubmitted = false;


  constructor( private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService) { }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "705967355015-bg5khpv6q37ua2is1hgo5sjvlqlo2gd1.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any){
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle( response.credential)
        .subscribe( resp => {
          //console.log({login: resp});

          // Navegar al Dashboar
          this.router.navigateByUrl('/');
        })
  }

  public loginForm: FormGroup = this.fb.group({
    email: [ localStorage.getItem('email' || ''), [Validators.required, Validators.email]],
    password: ['', Validators.required],
    recuerdame: [false],
  });


  login(){
    this.usuarioService.login(this.loginForm.value)
                       .subscribe( resp => {
                          if (this.loginForm.get('recuerdame').value) {
                            localStorage.setItem('email', this.loginForm.get('email').value)
                          } else {
                            localStorage.removeItem('email');
                          }

                          // Navegar al Dashboar
                          this.router.navigateByUrl('/');

                       }, (err) => {
                        // Si sucede un error
                        Swal.fire('Error', err.error.msg, 'error');
                       })

  }

}


