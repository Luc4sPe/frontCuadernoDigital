import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RiegoDto } from 'src/app/Core/dto/riego-dto';
import { RiegoService } from 'src/app/service/riego.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-riego-nuevo',
  templateUrl: './riego-nuevo.component.html',
  styleUrls: ['./riego-nuevo.component.css']
})
export class RiegoNuevoComponent implements OnInit {

    duracionEnHoras!: Date;
    milimetrosAplicados!:number;
    numeroDeCuadro!: number;
    observacionProductor: string="";
    semanaAplicada!: number;
    semanaTransplante!: number;
    nombreUsuario: any;
    msj: string="";
    nuevoRiegoDto: RiegoDto | any ;


  constructor(private tokenService: TokenService, private router: Router, private riegoservice: RiegoService) { }

  ngOnInit(): void {
  }

  nuevoRiego(form: NgForm): void{

    this.nombreUsuario =  this.tokenService.getUserName();

    this.nuevoRiegoDto = new RiegoDto(
      this.duracionEnHoras, this.milimetrosAplicados,
      this.numeroDeCuadro,this.observacionProductor,
      this.semanaAplicada, this.semanaTransplante,
      this.nombreUsuario
    );
    
    Swal.fire({
      title:'¿Crear un Nuevo Riego?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Crear',
      icon: 'question'      
    }).then((result) => {
      if(result.isConfirmed){
        this.solicitudDeCreacion(form)
      }
    });
  }

  solicitudDeCreacion(form: NgForm){
    this.riegoservice.nuevo(this.nuevoRiegoDto).subscribe(
      data => {
        this.msj = data.mensaje;
        Swal.fire(this.msj, '', 'success');
        form.resetForm();
      },
      err => {
        this.msj = err.error.mensaje;
        Swal.fire("Error al generar el nuevo Riego",this.msj, 'error');
      }
    )
  }

  volver(): void {
    this.router.navigate(['/']);
  }



}
