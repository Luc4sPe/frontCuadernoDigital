import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/modelo/usuario';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  usuario: any;
  //usuario: any= new Usuario('','','','','');
  rol!:string ;

  

  constructor(
    private usuarioService: AuthService ,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    const id = this.activatedRoute.snapshot.params.id;
    
    this.usuarioService.datail(id).subscribe(
      data => {
        this.usuario = data
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

  onActualizar(): void {

    
      const id = this.activatedRoute.snapshot.params.id;
      alert(id);
      
      this.usuarioService.actu(id,this.usuario).subscribe(
        data =>  {
          this.usuario=data;
          this.toastr.success('Usuario Actualizado', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['/']);
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail esta es la falla ', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
          this.router.navigate(['/']);
        }
      );
  }

  
  
}
