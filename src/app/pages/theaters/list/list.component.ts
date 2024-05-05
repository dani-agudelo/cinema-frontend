import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theater } from 'src/app/models/theater.model';
import { TheaterService } from 'src/app/services/theater.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  //Se declara un arreglo de theaters ya que se va a listar varios registros
  theaters: Theater[]

  constructor(private service: TheaterService, private router: Router) {
    this.theaters = []
  }

  // cada vez que se carga el componente se ejecuta el método ngOnInit y se listan los teatros
  ngOnInit(): void {
    this.list();
  }

  list() {
    this.service.listar().subscribe(data => {
      //Se asigna el resultado de la consulta al arreglo de theaters
      // queda this.theaters = data. se castea data a Theater[]
      this.theaters = data;
      console.log(JSON.stringify(this.theaters));
    })
  }

  view(id: number) {
    this.router.navigate(['theaters/view/' + id]);
  }

  create() {
    this.router.navigate(["theaters/create"])
  }

  update(id: number) {
    this.router.navigate(['theaters/update/' + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar el registro?',
      text: "Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        //Se llama al método delete del servicio y se le pasa el id del registro a eliminar
        this.service.delete(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'El registro ha sido eliminado.',
            'success'
          )
          //Se vuelve a listar los registros
          this.ngOnInit();
        });
      }
    })
  }
}
