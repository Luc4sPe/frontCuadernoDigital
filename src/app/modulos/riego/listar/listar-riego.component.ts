import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/dto/usuario';
import { Riego } from 'src/app/modelo/riego';
import { RiegoService } from 'src/app/service/riego.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-listar-riego',
  templateUrl: './listar-riego.component.html',
  styleUrls: ['./listar-riego.component.css']
})
export class ListarRiegoComponent implements OnInit {

  riegos: Riego[]=[];
  nombre: string[]=[];
  isAdmin = false;
  isLoged=false;
  isEncargadoAgri = false;
  isProductor = false;
  roles: string[]=[];

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private riegoService: RiegoService,
    
   ) { }

  ngOnInit(): void {

    this.listarRiego();
    this.roles=this.tokenService.getAuthorities();
    this.isLoged=true;
    this.roles.forEach(rol =>{
      if(rol === 'ROLE_ADMIN'){
        this.isAdmin=true;
      } 

      if(rol=== 'ROLE_ENCARGADO_AGRICOLA'){
        this.isEncargadoAgri=true;
      }

      if(rol=== 'PRODUCTOR'){

          this.isProductor=true;

      }
      
    });

    
  }

  listarRiego(): void{
    this.riegoService.listar().subscribe(
      data =>{
        this.riegos = data;
      }
    )
  }

  volver(): void {
    this.router.navigate(['/']);
  }

}
