import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  roles: string[]=[];
  isAdmin = false;
  isLogged = false;
  isEncargadoAgri = false;
  isProductor = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {

    this.roles=this.tokenService.getAuthorities();
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

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }

}
