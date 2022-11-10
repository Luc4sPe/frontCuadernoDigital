import { Cuadro } from "../modelo/cuadro";
import { Usuario } from "../modelo/usuario";

export class ModificarFincaDto {

    nombre:string;
    direccion:string;
    // longitud:number;
    // latitud:number;
    nombreProductor: string;
   
    constructor(nombre:string, direccion:string, nombreProductor: string ){
        
        this.nombre=nombre;
        this.direccion=direccion;    
        this.nombreProductor=nombreProductor;

    }
}
