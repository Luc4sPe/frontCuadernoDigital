import { Cuadro } from "./cuadro";
import { Finca } from "./finca";
import { Usuario } from "./usuario";

export class AsesoriaRiego {

    id?: number;
    duracionEnHoras: Date;
    milimetrosAplicados:number;
    finca: Finca;
    cuadro: Cuadro;
    productor: Usuario
    fechaRiego: Date = new Date();
    fechaModificacionRiego: Date = new Date();
    fechaModificacionEstado: Date = new Date();
    asesoriaAplicada: boolean = true;
    
    constructor( duracionEnHoras: Date,milimetrosAplicados:number,finca: Finca,cuadro: Cuadro,productor: Usuario){

        this.duracionEnHoras=duracionEnHoras;
        this.milimetrosAplicados=milimetrosAplicados;
        this.finca=finca;
        this.cuadro=cuadro;
        this.productor=productor;
          
    }
   
}
