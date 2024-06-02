import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Projector } from 'src/app/models/projector.model';
import { Theater } from 'src/app/models/theater.model';
import { ProjectorService } from 'src/app/services/projector.service';
import { TheaterService } from 'src/app/services/theater.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  mode: number // 1--> View, 2-->Create, 3-->Update
  theater: Theater;
  theFormGroup: FormGroup;
  trySend: boolean;
  projectors: Projector[]

  constructor(private activateRoute: ActivatedRoute,
    private service: TheaterService,
    private router: Router,
    private theFormBuilder: FormBuilder,
    private projectorsService: ProjectorService) {
    this.projectors = []
    this.trySend = false;
    // se inicializa en 1 para que por defecto se muestre la vista
    this.mode = 1;
    this.theater = {
      id: 0,
      capacity: 0,
      location: '',
      projector: {
        id: 0
      }
    }
    this.configFormGroup();
  }


  /**
   * Configures the form group for managing theaters.
   */
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento es el valor por defecto
      // segundo elemento es un array de validaciones 
      capacity: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      location: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      idProjector: [null, [Validators.required]]
    });
  }

  // Getter para acceder a los controles del formulario, para saber que se ha ingresado
  // Al ser un get se puede acceder luego sin ()
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  // getTheaterData() {
  //   this.theater.capacity = this.getTheFormGroup.capacity.value;
  //   this.theater.location = this.getTheFormGroup.location.value;
  // }

  ngOnInit(): void {
    this.projectorsList()

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
      this.theater.id = this.activateRoute.snapshot.params.id;
      this.getTheater(this.theater.id);
    }
  }

  projectorsList() {
    this.projectorsService.listar().subscribe(data => {
      this.projectors = data

    })
  }

  getTheater(id: number) {
    this.service.view(id).subscribe(data => {
      this.theater = data;
      console.log('Theater: ' + JSON.stringify(this.theater));
    })
  }

  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error', 'Por favor complete los campos requeridos', 'error');
      return;
    }
    this.service.create(this.theater).subscribe(data => {
      Swal.fire('Creación exitosa', 'Se ha creado un nuevo registro', 'success')
      this.router.navigate(["theaters/list"])
    })
  }

  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire('Error', 'Por favor complete los campos requeridos', 'error');
      return;
    }
    this.service.create(this.theater).subscribe(data => {
      Swal.fire('Actualización exitosa', 'Se ha actualizado un registro', 'success')
      this.router.navigate(["theaters/list"])
    })
  }
}




