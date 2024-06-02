import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  theUser: User;
  constructor(private theSecurityService: SecurityService, private router: Router) {
    this.theUser = {
      email: '',
      password: ''
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  login() {
    this.theSecurityService.login(this.theUser).subscribe({
      //* next es el callback que se ejecuta cuando el observable emite un valor
      next: (data) => {
        console.log('respuesta', JSON.stringify(data));
        //* Guardar la sesión en el local storage
        this.theSecurityService.saveSession(data);
        //* Redireccionar al dashboard porque el login fue exitoso
        this.router.navigate(['dashboard']);
      },
      //* error es el callback que se ejecuta cuando el observable emite un error
      error: (error) => {
        if (error.status === 401) {
          Swal.fire('Error', 'Usuario o contraseña incorrectos', 'error');
        }
      }
    })
  }

}
