import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarRiego } from 'src/app/dto/editar-riego';
import { RiegoDto } from 'src/app/dto/riego-dto';

import { Riego } from 'src/app/modelo/riego';
import { RiegoService } from 'src/app/service/riego.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-riego',
  templateUrl: './editar-riego.component.html',
  styleUrls: ['./editar-riego.component.css']
})
export class EditarRiegoComponent implements OnInit {
  
  riego!: Riego; // sera undefined hasta obtener el riego desde la suscripción
 // sera undefined hasta obtener el riego desde la suscripción
  usuario: any;
  mensaje: string='';


  constructor(
    private router: Router,
    private riegoService: RiegoService,
    private rutaActiva: ActivatedRoute 
  ) { }

  ngOnInit(): void {
     const id= this.rutaActiva.snapshot.params.id;
     
    this.obtenerRiego(id);
  }
 
  async obtenerRiego(id: number): Promise<void> {
   
    await this.riegoService.datalle(id).subscribe(
      data =>{
        this.riego=data;

      }, 
       err => {
         this.mensaje = err.error.mensaje;
         Swal.fire('Error',this.mensaje,'error');
         
       }
      
    );
  }

  editarRiego(): void{
   
    Swal.fire({
      title: '¿Realmente deseas editar el Riego?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Editar',
      icon: 'question'
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitudActualizar();
      }
    })
  }

   solicitudActualizar(): void  {

     const id= this.rutaActiva.snapshot.params.id;

      const editar = new EditarRiego (this.riego.duracionEnHoras,this.riego.milimetrosAplicados,
        this.riego.numeroDeCuadro,this.riego.observacionProductor,this.riego.semanaAplicada,this.riego.semanaTransplante,
        this.riego.nombreUsuario.nombreUsuario);

       this.riegoService.actualizarRiego(id,editar).subscribe(
        data =>{
          this.riego=data;
          //Swal.fire('Riego actualizado correctamente', '', 'success'); 
         this.mensaje= data.mensaje;
          Swal.fire(this.mensaje,'','success');
        }, 
        err =>{
          this.mensaje= err.error.mensaje;
        }
      );
       
    }

}
