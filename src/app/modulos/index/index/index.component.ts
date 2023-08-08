import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { TokenService } from '../../../service/token.service';
import { AsesoriaRiegoService } from 'src/app/service/asesoria-riego.service';
import { CultivoService } from 'src/app/service/cultivo.service';
import { AgroquimicoService } from 'src/app/service/agroquimico.service';
import { FincaService } from 'src/app/service/finca.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  nombreUsuario: any = '' ;
  nombreUsuarioProductor: any = '' ;
  isLogged = false;

 roles : string[] = [];

  isAdmin = false;
  isUser = false;
  isProctor = false;
  isGerente = false;
  isEncargadoAgricola = false;
  nombre:string;
  minuscula:any;
  conversion:any;

  cantidadAsesoriaRiego: number = 0;
  cantidadAsesoriaRiegoAplicada: number = 0;
  cantidadAsesoriaNoAplicada: number = 0;
  cantidadUsuarios: number = 0;
  cantidadUsuariosActivos: number = 0;
  cantidadUsuariosInactivos: number = 0;
  cantidadCultivos: number = 0;
  cantidadAgroquimicos: number = 0;
  cantidadFinca: number = 0;
  cantidadProductor: number = 0;
  cantidadProductorActivo: number = 0;
  cantidadProductorInactivo: number = 0;
  cantidadAsesoriaRiegoByProductor: number = 0;
  cantidadAsesoriaRiegoAplicadaByProductor: number = 0;
  cantidadAsesoriaRiegoNoAplicadaByProductor: number = 0;

  

  constructor(
    private tokenService: TokenService, 
    private cultivoService: CultivoService,
    private usuarioService: UsuarioService,
    private asesoriaRiegoService: AsesoriaRiegoService,
    private agroquimicoService: AgroquimicoService,
    private fincaService: FincaService
    
    ) { }

  ngOnInit(): void {
   
    //obtengo la primera letra del nombre en mayuscula
    this.nombreUsuario = this.tokenService.getUserName()!.charAt(0).toLocaleUpperCase();
    //obtengo el nombre completo  variable minuscula
    this.minuscula=this.tokenService.getUserName();
    //concateno la primera letra en mayuscula, y con slice se toma el nombre apartir del segundo caracter en minuscula para formar el nombre
    this.conversion= this.nombreUsuario+this.minuscula.slice(1)
 
    this.obtenerRolesDelUsuario();

    if (this.tokenService.getToken()) {
        this.isLogged = true;
        //this.nombreUsuario = this.tokenService.getUserName();
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    }

    
    this.cargarTotalesAlInicio();
    
  
  }

  

  public obtenerRolesDelUsuario():void{
    this.roles = this.tokenService.getAuthorities();
    this.isAdmin = this.tokenService.isAdmin();
    this.isEncargadoAgricola = this.tokenService.isEncargadoAgricola();
    this.isUser = this.tokenService.isUser();
    this.isProctor = this.tokenService.isProductor();
    this.isGerente = this.tokenService.isGerente();
  }

  public cargarTotalesAlInicio():void{
    this.obtenerTotalesAsesoria();
    this.obtenerTotalesUsuarios();
    this.obtenerCantidadCultivos();
    this.obtenerCantidadAgroquimicos();
    this.obtenerCantidadFinca();
    this.obtenerTotalesProductor();
    this.obtenerTotalesAsesoriaRiegoByProductor();
   
   
  } 

  public obtenerTotalesAsesoria(): void {
    if(this.isEncargadoAgricola){
      this.obtenerCantidadAsesoriaRiego();
      this.obtenerCantidadAsesoriaRiegoAplicada();
      this.obtenerCantidadAsesoriaRiegoNoAplicada();
    }
  }

  public obtenerCantidadAsesoriaRiego():void{
    this.asesoriaRiegoService.cantidadAsesoriaRiego().toPromise().then(data =>{
        this.cantidadAsesoriaRiego = data;
       
    })
  }


  public obtenerCantidadAsesoriaRiegoAplicada(): void{
    this.asesoriaRiegoService.cantidadAsesoriaRiegoAplicada().toPromise().then(data =>{
      this.cantidadAsesoriaRiegoAplicada = data;

    })
  }

  public obtenerCantidadAsesoriaRiegoNoAplicada(): void{
    this.asesoriaRiegoService.cantidadAsesoriaRiegoNoAplicada().toPromise().then(data =>{
      this.cantidadAsesoriaNoAplicada = data;

    })
  }

  public obtenerTotalesUsuarios(): void {
    if(this.isAdmin){
      this.obtenerCantidadUsuarios();
      this.obtenerCantidadUsuariosActivos();
      this.obtenerCantidadUsuariosInactivos();
    }
  }

  public obtenerCantidadUsuarios():void{
    this.usuarioService.cantidadUsuarios().toPromise().then(data =>{
      this.cantidadUsuarios = data;
    })
  }

  public obtenerCantidadUsuariosActivos(): void{
    this.usuarioService.cantidadUsuariosActivos().toPromise().then(data =>{
      this.cantidadUsuariosActivos=data;
    })
  }

  public obtenerCantidadUsuariosInactivos(): void{
    this.usuarioService.cantidadUsuarioInactivos().toPromise().then(data =>{
      this.cantidadUsuariosInactivos=data;
    })
  }

  public obtenerCantidadCultivos():void{
    if(this.isAdmin || this.isEncargadoAgricola){
      this.cultivoService.cantidadCultivos().toPromise().then(data =>{
        this.cantidadCultivos = data;
      })
    }
    
  }

  public obtenerCantidadAgroquimicos():void{
    if(this.isAdmin || this.isEncargadoAgricola){
      this.agroquimicoService.cantidadAgroquimicos().toPromise().then(data =>{
        this.cantidadAgroquimicos = data;
      })
    }
    
  }


  public obtenerCantidadFinca():void{
    if(this.isAdmin || this.isEncargadoAgricola){
      this.fincaService.cantidadFincas().toPromise().then(data =>{
        this.cantidadFinca = data;
      })
    }
    
  }


  public obtenerTotalesProductor(): void {
    if(this.isEncargadoAgricola){
      this.obtenerCantidadProductor("ROLE_PRODUCTOR");
      this.obtenerCantidadProductorActivos("ROLE_PRODUCTOR");
      this.obtenerCantidadProductorInactivos("ROLE_PRODUCTOR");
    }
  }


  public obtenerCantidadProductor( nombre: string):void{
    this.usuarioService.cantidadProductor(nombre).toPromise().then(data =>{
      this.cantidadProductor = data;
    })
  }

  public obtenerCantidadProductorActivos( nombre: string):void{
    this.usuarioService.cantidadProductorActivos(nombre).toPromise().then(data =>{
      this.cantidadProductorActivo = data;
    })
  }

  public obtenerCantidadProductorInactivos( nombre: string):void{
    this.usuarioService.cantidadProductorInactivos(nombre).toPromise().then(data =>{
      this.cantidadProductorInactivo = data;
    })
  }

  public obtenerTotalesAsesoriaRiegoByProductor(): void {
    if(this.isProctor){
      this.nombreUsuarioProductor = this.tokenService.getUserName();
      this.obtenerCantidadAsesoriaByProductor(this.nombreUsuarioProductor);
      this.obtenerCantidadAsesoriaAplicadaByProductor(this.nombreUsuarioProductor);
      this.obtenerCantidadAsesoriaNoAplicadaByProductor(this.nombreUsuarioProductor);
    }
  }

  public obtenerCantidadAsesoriaByProductor( nombre: string):void{
   this.asesoriaRiegoService.cantidadAsesoriaRiegoByProductor(nombre).toPromise().then(data =>{
      this.cantidadAsesoriaRiegoByProductor = data;
   })
  }

  public obtenerCantidadAsesoriaAplicadaByProductor( nombre: string):void{
    this.asesoriaRiegoService.cantidadAsesoriaRiegoAplicadaByProductor(nombre).toPromise().then(data =>{
       this.cantidadAsesoriaRiegoAplicadaByProductor = data;
    })
   }

   public obtenerCantidadAsesoriaNoAplicadaByProductor( nombre: string):void{
    this.asesoriaRiegoService.cantidadAsesoriaRiegoNoAplicadaByProductor(nombre).toPromise().then(data =>{
       this.cantidadAsesoriaRiegoNoAplicadaByProductor = data;
    })
   }


  



  

}
