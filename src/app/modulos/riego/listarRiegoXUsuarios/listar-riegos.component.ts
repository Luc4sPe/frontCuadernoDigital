import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/Core/modelo/usuario';
import { Riego } from 'src/app/Core/modelo/riego';
import { RiegoService } from 'src/app/service/riego.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-listar-riegos',
  templateUrl: './listar-riegos.component.html',
  styleUrls: ['./listar-riegos.component.css']
})
export class ListarRiegosComponent implements OnInit {

  riegos: Riego []=[];

  isAdmin = false;
  isLoged=false;
  isEncargadoAgri = false;
  isProductor = false;
  roles: string[]=[];
  //nombreUsuario!: Usuario;
  


  constructor(
    private riegoService: RiegoService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {

     
   

    

  }

    
 
}
