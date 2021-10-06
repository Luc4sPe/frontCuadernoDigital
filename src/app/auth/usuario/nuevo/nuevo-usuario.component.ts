import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NuevoUsuario } from 'src/app/dto/nuevo-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';



@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})

export class NuevoUsuarioComponent implements OnInit {
  

  //usuario= new NuevoUsuario('','','','','','');
  //formUsuario!: FormGroup;
  //rol!:string ;
  //private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  nombre: string='';
  apellido: string='';
  dni: string='';
  nombreUsuario: string='';
  email: string='';
  password: string='';
  msj: string='';
  nuevoUsuario: NuevoUsuario | any;
  roles=[
    {
    name:'Admin',
    active: false,
    description:'',
  },
  {
    name:'User',
    active: false,
    description:'Rol por defecto',
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
]
  
  constructor( private service: AuthService, private router: Router) { }

  ngOnInit(): void {
    //this.buildFrom();
  
    
  }


  registrarUsuario(form: NgForm):  void{
    let rolUsuarios = this.crearRoles();
    this.nuevoUsuario = new NuevoUsuario(
      this.nombre, this.apellido,
      this.dni, this.nombreUsuario,
      this.email, this.password,
      rolUsuarios
    );

    this.service.nuevo(this.nuevoUsuario).subscribe(
      data =>{
        this.msj = data.mensaje;
        Swal.fire({
          icon: 'success',
          title: this.msj,
          text: '',
        });
        
        this.resetiarRoles();
        form.resetForm();
      },
      err =>{
        this.msj = err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title: '',
          text: this.msj,
        });        
      }
    )

  }


  crearRoles(): string[] {
    let result = this.roles
        .filter((role) => role.active === true)
        .map((role) => role.name); 
    return result;
  }

  resetiarRoles(): void {
    this.roles
      .filter((role) => role.name != 'User')
      .forEach((role) => role.active = false);
    
  }

  // async Guardar(){   
    
  //   if(this.rol === "Admin"){
      
  //     this.usuario.roles.push('Admin');
      
  //   }
  //   if(this.rol === "Encargado Agricola"){
      
  //     this.usuario.roles.push('Encargado Agricola');
      
  //   }
  //   if(this.rol === "Productor"){
      
  //     this.usuario.roles.push('Productor');
      
  //   }
  //     await console.log(this.usuario.roles);
  //     await this.service.nuevo(this.usuario).subscribe(data=>{

  //       Swal.fire({
  //         position: 'top',
  //         icon: 'success',
  //         title: 'usuario Creado',
  //         showConfirmButton: false,
  //         timer: 1500
  //       })
  //       this.router.navigate(["usuario"]);

  //      })
    
    
  
  // }


    // get nombre(){return this.formUsuario.get('nombre');}
    // get apellido(){return this.formUsuario.get('apellido');}
    // get dni(){return this.formUsuario.get('dni');}
    // get nombreUsuario(){return this.formUsuario.get('nombreUsuario');}
    // get email(){return this.formUsuario.get('email');}
    // get password(){return this.formUsuario.get('password');}
    // get roles(){return this.formUsuario.get('roles');}

    // private buildFrom(){
    //   this.formUsuario = new FormGroup({
    //     nombre: new FormControl('',[Validators.required]),
    //     apellido: new FormControl('',[Validators.required]),
    //     dni: new FormControl('',[Validators.required]),
    //     nombreUsuario: new FormControl('',[Validators.required]),
    //     email: new FormControl('',[Validators.required, Validators.pattern(this.emailPattern)]),
    //     password: new FormControl('',[Validators.required]),
    //     roles: new FormControl('',[Validators.required]),
    //   });
    }


    
    


    
  

