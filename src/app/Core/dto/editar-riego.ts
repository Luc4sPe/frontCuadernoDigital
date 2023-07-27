import { Cuadro } from "../modelo/cuadro";
import { Finca } from "../modelo/finca";

export class EditarRiego {

    duracionEnHoras: Date;
    milimetrosAplicados:number;
    idCuadro: number;
    observacionProductor: string;
    justificacionProductor: string;
    idFinca: number;
   
    constructor( duracionEnHoras: Date,milimetrosAplicados:number, idCuadro: number, observacionProductor: string, justificacionProductor: string, idFinca: number){

        this.duracionEnHoras=duracionEnHoras;
        this.milimetrosAplicados=milimetrosAplicados;
        this.idCuadro=idCuadro;
        this.observacionProductor=observacionProductor;
        this.justificacionProductor=justificacionProductor;
        this.idFinca=idFinca;
        
         
    }
}
