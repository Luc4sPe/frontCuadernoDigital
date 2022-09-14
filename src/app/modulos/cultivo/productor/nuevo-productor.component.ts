import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/Core/dto/nuevo-usuario';
import { ProductorDto } from 'src/app/Core/dto/productor-dto';
import { CultivoService } from 'src/app/service/cultivo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-productor',
  templateUrl: './nuevo-productor.component.html',
  styleUrls: ['./nuevo-productor.component.css']
})
export class NuevoProductorComponent implements OnInit {

  patronLetras: string = "^[a-z A-ZÀ-ÿ\u00f1\u00d1]*(\s*[a-z A-ZÀ-ÿ\u00f1\u00d1]*)*[a-z A-ZÀ-ÿ\u00f1\u00d1]+$"
  
  nombre: string='';
  apellido: string='';
  dni: string='';
  nombreUsuario: string='';
  email: string='';
  password: string='';
  telefono: string='';
  nuevoProductor: NuevoUsuario | any ;
  msj!: string;

  constructor(private service: CultivoService,private router: Router) { }

  ngOnInit(): void {
  }

  registrarProductor(form: NgForm): void{
    this.nuevoProductor=new ProductorDto(
      this.apellido,
      this.nombre,this.dni,
      this.nombreUsuario,this.email,
      this.telefono,
      this.password);
    Swal.fire({
      title:'¿Crear un Productor nuevo?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      icon: 'question'      
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitudCrearProductor(form)
      }
    });
  }

  solicitudCrearProductor(form: NgForm): void{
   
    this.service.crearProductor(this.nuevoProductor).subscribe(
      data => {
        this.msj = data.mensaje;
        Swal.fire({
          icon: 'success',
          title: this.msj,
          text: 'Productor Creado con Exito, para terminar debe asignar una finca ',
        });

        form.resetForm();
      },
      err =>{
        this.msj = err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title:'Error al crear el Productor',
          text: this.msj,
        });        
      }
    )

    }
  }