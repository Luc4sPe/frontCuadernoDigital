import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/modelo/usuario';
import { AuthService } from 'src/app/service/auth.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-obtner',
  templateUrl: './obtner.component.html',
  styleUrls: ['./obtner.component.css']
})
export class ObtnerComponent implements OnInit {

  usuario!: any;
  roles:string[]=[];
  
  
  constructor(
    private usuarioService: UsuarioService ,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    var document: any;
    const id = this.activatedRoute.snapshot.params.id;
    
    this.usuarioService.datail(id).subscribe(
      data => {
        this.usuario = data;
       
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.volver();
      }
    );
    
    

  }

  volver(): void {
    this.router.navigate(['/usuario']);
  }
}
