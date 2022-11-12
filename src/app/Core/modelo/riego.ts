import { Cuadro } from "./cuadro";
import { Finca } from "./finca";
import { Usuario } from "./usuario";

export class Riego {
    id?: number;
    duracionEnHoras: Date;
    milimetrosAplicados:number;
    idCuadros: Cuadro;
    observacionProductor: string;
    justificacionProductor: string;
    finca: Finca;
    fechaRiego: Date = new Date();
    fechaModificacionRiego: Date = new Date();

    constructor( duracionEnHoras: Date,milimetrosAplicados:number, idCuadros: Cuadro, observacionProductor: string, justificacionProductor: string,finca: Finca){

        this.duracionEnHoras=duracionEnHoras;
        this.milimetrosAplicados=milimetrosAplicados;
        this.idCuadros=idCuadros;
        this.observacionProductor=observacionProductor;
        this.justificacionProductor=justificacionProductor;
        this.finca=finca;
         
    }
    
}
