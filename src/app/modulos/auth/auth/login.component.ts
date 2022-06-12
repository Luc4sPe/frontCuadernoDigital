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
  errMsj: string='';
  hide:boolean = true;


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
<<<<<<< Updated upstream:src/app/auth/Login/login.component.ts
     // this.router.navigate(['/']);
=======
      this.router.navigate(['/index']);
>>>>>>> Stashed changes:src/app/modulos/auth/auth/login.component.ts
    }
  }

  onLogin(): void{
    this.loginUsuario= new LoginUsuario(this.nombreUsuario,this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        
<<<<<<< Updated upstream:src/app/auth/Login/login.component.ts
         //almacenamos en sessionStorage
=======
         //almacenamos en localStorage
>>>>>>> Stashed changes:src/app/modulos/auth/auth/login.component.ts
        this.tokenService.setToken(data.token);

        this.isLogged=true;  
        this.isLoginFail = false;
<<<<<<< Updated upstream:src/app/auth/Login/login.component.ts

       // this.roles=data.authorities;
=======
>>>>>>> Stashed changes:src/app/modulos/auth/auth/login.component.ts
               
        Swal.fire({
          icon : 'success',
          title : 'Bienvenido ' + this.nombreUsuario,
          text : 'Iniciaste sesion correctamente'

        })

        this.roles = this.tokenService.getAuthorities();
<<<<<<< Updated upstream:src/app/auth/Login/login.component.ts
        this.router.navigate(['/']);
=======
        this.router.navigate(['/index']);
>>>>>>> Stashed changes:src/app/modulos/auth/auth/login.component.ts
      },
      err =>{
        this.isLogged=false;
        this.isLoginFail = true;
        this.errMsj= err.error.mensaje;
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesion',
          text: err.error.message
        })
        
        console.log(err.error.message);
        
      }
    );
  }

  cambioEstadoPassword(): void{
    this.hide=!this.hide;
  }

  

}
