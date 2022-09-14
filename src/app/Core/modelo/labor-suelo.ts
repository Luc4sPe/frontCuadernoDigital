import { Cuadro } from "./cuadro";

export class LaborSuelo {
    id?: number;
    cultivoAnterior: string;
    fechaLabor: Date = new Date();
    fechaModificacionLabor: Date = new Date();
    herramientasUtilizadas: string;
    idCuadro: Cuadro;
    labor: string;
    observacion: string;
    justificacion: string;

    constructor(cultivoAnterior: string, herramientasUtilizadas: string, idCuadro: Cuadro, labor: string,
        observacion: string,justificacion: string){

            this.cultivoAnterior=cultivoAnterior;
            this.herramientasUtilizadas=herramientasUtilizadas;
            this.idCuadro=idCuadro;
            this.labor=labor;
            this.observacion=observacion;
            this.justificacion=justificacion;

    }

}
