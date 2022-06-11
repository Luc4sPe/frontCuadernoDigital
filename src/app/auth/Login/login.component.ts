
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { LoginUsuario } from '../../Core/dto/login-usuario';
import { AuthService } from '../../service/auth.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  //@Output() pressLogin = new EventEmitter<boolean>();


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
     // this.router.navigate(['/']);
    }
  }


  onLogin(): void{
    this.loginUsuario= new LoginUsuario(this.nombreUsuario,this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        
         //almacenamos en sessionStorage
        this.tokenService.setToken(data.token);

        this.isLogged=true;  
        this.isLoginFail = false;

       // this.roles=data.authorities;
               
        Swal.fire({
          icon : 'success',
          title : 'Bienvenido ' + this.nombreUsuario,
          text : 'Iniciaste sesion correctamente'

        })

        this.roles = this.tokenService.getAuthorities();
        this.router.navigate(['/']);
      },
      err =>{
        this.isLogged=false;
        
        this.errMsj= err.error.mensaje;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        console.log(err.error.message);
        
      }
    );
  }

  cambioEstadoPassword(): void{
    this.hide=!this.hide;
  }

  

}
