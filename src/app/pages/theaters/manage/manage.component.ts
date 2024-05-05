import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Theater } from 'src/app/models/theater.model';
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

  constructor(private activateRoute: ActivatedRoute, 
              private service: TheaterService,
              private router: Router) {
    this.mode = 1;
    this.theater = {
      id: 0,
      capacity: 0,
      location: '',
    }
  }
  //configFormGroup();

  // configFormGroup() {
  //   this.theFormGroup = this.theFormBuilder.group({
  //     // primer elemento es el valor por defecto
  //     // segundo elemento es la validación
  //     capacity: ['', [Validators.min(1), Validators.max(100)]],
  //     location: ['', [Validators.minLength(2)]]
  //   });
  // }

  // // Getter para acceder a los controles del formulario
  // get getTheFormGroup() {
  //   return this.theFormGroup.controls;
  // }

  // getTheaterData() {
  //   this.theater.capacity = this.getTheFormGroup.capacity.value;
  //   this.theater.location = this.getTheFormGroup.location.value;
    
  // }

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
      this.theater.id = this.activateRoute.snapshot.params.id;
      this.getTheater(this.theater.id);
    }
  }

  getTheater(id: number) {
    this.service.view(id).subscribe(data => {
      this.theater = data;
      console.log('Theater: ' + JSON.stringify(this.theater));

    })
  }

  create(){
    this.service.create(this.theater).subscribe(data=>{
      Swal.fire('Creación exitosa', 'Se ha creado un nuevo registro', 'success')
      this.router.navigate(["theaters/list"])
    })
  }

  update(){
    this.service.create(this.theater).subscribe(data=>{
      Swal.fire('Actualización exitosa', 'Se ha actualizado un registro', 'success')
      this.router.navigate(["theaters/list"])

    })
  }
}




