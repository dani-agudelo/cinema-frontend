import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { SecurityService } from '../services/security.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private securityService: SecurityService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("interceptando")
    // Obtiene el usuario activo
    let theUser = this.securityService.activeUserSession;
    const token = theUser["token"];
    // Si la solicitud es para la ruta de "login", no adjuntes el token
    if (request.url.includes('/login') || request.url.includes('/token-validation')) {
      console.log("no se pone token")
      // Continúa con la solicitud sin adjuntar el token
      return next.handle(request);
    } else {
      console.log("colocando token " + token)
      // Adjunta el token a la solicitud 
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Adjunta el tken y espera la respuesta, si hay un error, se captura
      // el pipe permite interceptar la respuesta y realizar acciones
      return next.handle(authRequest).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            Swal.fire({
              title: 'No está autorizado para esta operación',
              icon: 'error',
              timer: 5000
            });
            // Si la respuesta es 401, redirige al usuario a la página de inicio de sesión
            this.router.navigateByUrl('/login');
          } else if (err.status === 400) {
            Swal.fire({
              title: 'Existe un error, contacte al administrador',
              icon: 'error',
              timer: 5000
            });
          }
          // Retorna un observable vacío para que la aplicación no se bloquee
          return new Observable<never>();
        }));
    }
  }
}
