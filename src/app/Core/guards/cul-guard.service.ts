import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CulGuardService implements CanActivate {

  constructor(private tokenService: TokenService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const rolesEsperados = route.data.rolesEsperados;
    const rolesUsuario = this.tokenService.getAuthorities();
    let permitido = false;

    /** comprobamos si esta logueado, si no lo está se redirige al login */

    if (!this.tokenService.isLogged()) {
      this.router.navigate(['/login']);
      Swal.fire('Acceso denegado', 'Debes iniciar sesion', 'error');
      
      return false;
    }

     /** se comprobo si no expiro el token para cargar el componente */    
     if(this.tokenService.isTokenExpired()){
      this.router.navigate(['/login']);
      Swal.fire('Sesión Expirada', 'Debes iniciar sesion nuevamente', 'info');
      this.tokenService.logOut();
      return false;
    }


     /** se comprueba con un acumulador booleano, si el usuario tiene alguno de los roles esperados para acceder */
     rolesEsperados.forEach((rol: string) => {
      permitido = permitido || rolesUsuario.includes(rol);
    });

    if (!permitido) {
      this.router.navigate(['/index']);
      Swal.fire('Acceso denegado','No tienes los permisos necesarios para acceder','error');
      return false;
    }

    /** si paso todas las comprobaciones, permtimos el acceso */
    return true;
  }
    
  
}
