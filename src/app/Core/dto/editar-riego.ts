import { Cuadro } from "../modelo/cuadro";
import { Finca } from "../modelo/finca";

export class EditarRiego {

    duracionEnHoras: Date;
    milimetrosAplicados:number;
    idCuadros: number;
    observacionProductor: string;
    justificacionProductor: string;
    finca: number;
    fechaRiego: Date = new Date();
    fechaModificacionRiego: Date = new Date();

    constructor( duracionEnHoras: Date,milimetrosAplicados:number, idCuadros: number, observacionProductor: string, justificacionProductor: string,finca: number){

        this.duracionEnHoras=duracionEnHoras;
        this.milimetrosAplicados=milimetrosAplicados;
        this.idCuadros=idCuadros;
        this.observacionProductor=observacionProductor;
        this.justificacionProductor=justificacionProductor;
        this.finca=finca;
         
    }
}
