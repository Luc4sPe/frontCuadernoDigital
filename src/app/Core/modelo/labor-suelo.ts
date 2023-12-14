import { Cuadro } from "./cuadro";
import { Finca } from "./finca";

export class LaborSuelo {
    id?: number;
   // cultivoAnterior: string;
    fechaLabor: Date = new Date();
    fechaModificacionLabor: Date = new Date();
    herramientasUtilizadas: string;
    idCuadro: Cuadro;
    labor: string;
    observacion: string;
    justificacion: string;
    finca:Finca;

    constructor( herramientasUtilizadas: string, idCuadro: Cuadro, labor: string,
        observacion: string,justificacion: string, finca:Finca){

           // this.cultivoAnterior=cultivoAnterior;
            this.herramientasUtilizadas=herramientasUtilizadas;
            this.idCuadro=idCuadro;
            this.labor=labor;
            this.observacion=observacion;
            this.justificacion=justificacion;
            this.finca=finca;

    }

}
