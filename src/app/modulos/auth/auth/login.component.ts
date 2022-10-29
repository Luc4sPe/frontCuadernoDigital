import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/Core/dto/login-usuario';
import { AuthService } from 'src/app/service/auth.service';
import { TokenService } from 'src/app/service/token.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario | any;
  nombreUsuario: string='';
  password: string='';
  roles: string[]=[];
  msj: string='';
  hide:boolean = true;
  minuscula:any;
  conversion:any;


  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

   

    if(this.tokenService.getToken()){
      this.isLogged=true;
      this.isLoginFail=false;
      this.roles=this.tokenService.getAuthorities();
      this.router.navigate(['/index']);
    }
  }

  onLogin(): void{

   

    this.loginUsuario= new LoginUsuario(this.nombreUsuario,this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        
         //almacenamos en localStorage
        this.tokenService.setToken(data.token);

        this.isLogged=true;  
        this.isLoginFail = false;
               

    //obtengo la primera letra del nombre en mayuscula
    this.nombreUsuario = this.tokenService.getUserName()!.charAt(0).toLocaleUpperCase();
    //obtengo el nombre completo  variable minuscula
    this.minuscula=this.tokenService.getUserName();
    //concateno la primera letra en mayuscula, y con slice se toma el nombre apartir del segundo caracter en minuscula para formar el nombre
    this.conversion= this.nombreUsuario+this.minuscula.slice(1)
        Swal.fire({
          
          icon : 'success',
          title : 'Bienvenido ' + this.conversion,
          text : 'Iniciaste sesion correctamente'

        })

        this.roles = this.tokenService.getAuthorities();
        this.router.navigate(['/index']);
      },
      err =>{
        this.isLogged=false;
        this.isLoginFail = true;
        this.msj = err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: this.msj
        })
        
        
      }
    );
  }

  cambioEstadoPassword(): void{
    this.hide=!this.hide;
  }

  

}
