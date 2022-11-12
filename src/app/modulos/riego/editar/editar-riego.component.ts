import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarRiego } from 'src/app/Core/dto/editar-riego';
import { RiegoDto } from 'src/app/Core/dto/riego-dto';

import { Riego } from 'src/app/Core/modelo/riego';
import { RiegoService } from 'src/app/service/riego.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-riego',
  templateUrl: './editar-riego.component.html',
  styleUrls: ['./editar-riego.component.css']
})
export class EditarRiegoComponent implements OnInit {
  
  riego!: Riego; // sera undefined hasta obtener el riego desde la suscripción
 // sera undefined hasta obtener el riego desde la suscripción
  usuario: any;
  mensaje: string='';


  constructor(
    private router: Router,
    private riegoService: RiegoService,
    private rutaActiva: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    
  }
 


   

}
