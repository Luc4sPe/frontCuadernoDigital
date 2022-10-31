import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarUsuariosDto } from 'src/app/Core/dto/editar-usuarios-dto';
import { Usuario } from 'src/app/Core/modelo/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  usuario: any;
  rolUsuario: string []=[];
  msj:string;
  home : MenuItem = {}
  items : MenuItem[] = [];
  roles=[
  {
    name:'Admin',
    active: false,
    description:'',
  },
 

  {
    name:'Encargado Agricola',
    active: false,
    description:'',
  },

  {
    name:'Productor',
    active: false,
    description:'',
  },

  {
    name:'Gerente',
    active: false,
    description:'',
    
  }
 

]

  

  constructor(
    private usuarioService: UsuarioService ,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location : Location

  ) { }

  ngOnInit(): void {
    
    this.cargarItems();
    const id = this.activatedRoute.snapshot.params.id;
    this.obtenerUsuario(id);
   
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'}
    this.items = [
      {label:'Usuario'},
      {label:'Modificar datos', disabled:true}
    ];
    
  }


  obtenerUsuario(id: number){
    this.usuarioService.datail(id).toPromise().then(
      data =>{
        this.usuario=data;
        if(this.usuario.nombreUsuario == 'admin'){
          Swal.fire('No se puede ver o editar el usuario admin del sistema', 'Selecciona otro usuario a editar', 'error')
            .then( (result) => {this.location.back()}); 
        }
        this.resconstruirRoles();
      },
      err => {
        this.msj = err.error.mensaje;
        this.router.navigate(['/usuario/lista']);
        Swal.fire('Error',this.msj,'error');
  
      })
    

  }

  /* Se obtiene los roles solo los nombres que tiene el usuario y 
     luego al array de roles[nombre, activo y descripcion]
     que muestro en la vista se  agrego true o false en activo 
     filtrando en los roles que tiene el usuario*/

  resconstruirRoles(){
    this.rolUsuario=this.usuario.roles.map((rol:{rolNombre:string;}) =>rol.rolNombre);
    this.roles.forEach(rol =>{
      rol.active = this.rolUsuario.filter(
        role =>{
          let nombre = rol.name.toUpperCase().split('')
          return role.includes(nombre[nombre.length -1])
        }).length > 0 ? true : false;
    })

  }

  /*  Se contruyoe los roles para enviar al backen para actualizar el 
      usuario, dependiendo si active del checkbox colocando en true, se 
       obtiene solos los nombres de los roles (array de string[])
*/

  crearRolesEnviarBack(): string[]{
    
    let rolesCreados = this.roles.filter((role) => role.active === true).map((role) => role.name);
    return rolesCreados;
  }

  onActualizar(): void {

      const id = this.activatedRoute.snapshot.params.id;
      let rolesActualizar = this.crearRolesEnviarBack();
      const editarUsuario = new EditarUsuariosDto(this.usuario.nombre,this.usuario.apellido,this.usuario.dni,this.usuario.nombreUsuario,
        this.usuario.email,this.usuario.telefono,rolesActualizar); 
      this.usuarioService.update(id,editarUsuario).subscribe(
        data =>  {
          this.usuario=data;  
         Swal.fire('Usuario actualizado correctamente', '', 'success'); 
        },
        err => {
          this.msj = err.error.message;
          Swal.fire('Error al Actualizar el Usuario', this.msj, 'error');
        }
      );
  }

  cerrar(): void {
    this.location.back();
  }
  
}
