import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  movies: Movie[]


  constructor(private service: MovieService, private router: Router) {
    this.movies = []
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.listar().subscribe(data => {
      // se castea data a Movie[]
      this.movies = data;

      // Formatea la fecha para cada película
      this.movies.forEach(movie => {
        movie.year = movie.year.substring(0, 10);
      });
      console.log(JSON.stringify(this.movies));
    })
  }

  view(id: number) {
    this.router.navigate(['movies/view/' + id])
  }

  create() {
    this.router.navigate(['movies/create'])
  }

  update(id: number) {
    this.router.navigate(["movies/update/" + id])
  }

  delete(id: number) {
    Swal.fire({
      title: "¿Estás seguro de eliminar el registro?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.delete(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado.',
            'success'
          )
          this.ngOnInit()
        })
      }

    })
  }
}


