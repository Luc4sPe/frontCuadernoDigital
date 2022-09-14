import { Cuadro } from "./cuadro";
import { Usuario } from "./usuario";

export class Finca {
    idFinca?:number;
    nombre:string;
    direccion:string;
    longitud:number;
    latitud:number;
    cuadros: Cuadro[]=[];
    productor: Usuario;
    fechaCreacionFinca: Date = new Date();
    fechaModificacionFinca: Date = new Date();

    constructor(nombre:string, direccion:string, longitud:number, latitud:number, productor: Usuario ){
        
        this.nombre=nombre;
        this.direccion=direccion;
        this.longitud=longitud;
        this.latitud=latitud;
        this.productor=productor;

    }
}
