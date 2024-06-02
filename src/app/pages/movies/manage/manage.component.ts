import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  mode: number // 1--> View, 2-->Create, 3-->Update
  movie: Movie;
  trySend: boolean;

  constructor(private activateRoute: ActivatedRoute,
    private service: MovieService,
    private router: Router) {
    this.trySend = false;
    // se inicializa en 1 para que por defecto se muestre la vista
    this.mode = 1;
    this.movie = {
      id: 0,
      name: '',
      duration: 0,
      year: '',
    }
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');

    if (currentUrl.includes('view')) {
      this.mode = 1;
    }
    else if (currentUrl.includes('create')) {
      this.mode = 2;
    }
    else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    //Se obtiene el id del teatro a visualizar!!!
    if (this.activateRoute.snapshot.params.id) {
      this.movie.id = this.activateRoute.snapshot.params.id;
      this.getMovie(this.movie.id);
    }
  }

  getMovie(id: number) {
    this.service.view(id).subscribe(data => {
      this.movie = data;
      this.movie.year = this.movie.year.substring(0, 10);
      
      console.log('Movie: ' + JSON.stringify(this.movie));

    })
  }

  create() {
    // Ojo, no es necesario reconstruir el objeto, ya que con el [(ngModel)] se actualiza en tiempo real
    this.service.create(this.movie).subscribe(data => {
      Swal.fire('Creación exitosa', 'Se ha creado un nuevo registro', 'success')
      this.router.navigate(["movies/list"])
    })
  }

  update() {
    // if (this.theFormGroup.invalid) {
    //   this.trySend = true;
    //   Swal.fire('Error', 'Por favor complete los campos requeridos', 'error');
    //   return;
    // }
    this.service.update(this.movie).subscribe(data => {
      Swal.fire('Actualización exitosa', 'Se ha actualizado un registro', 'success')
      this.router.navigate(["movies/list"])
    })
  }

}
