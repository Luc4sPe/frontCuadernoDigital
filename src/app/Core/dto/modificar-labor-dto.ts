import { Cuadro } from "../modelo/cuadro";
import { Finca } from "../modelo/finca";

export class ModificarLaborDto {

    id?: number;
    cultivoAnterior: string;
    herramientasUtilizadas: string;
    idCuadro: number;
    labor: string;
    observacion: string;
    justificacion: string;
    idFinca:number;

    constructor(cultivoAnterior: string, herramientasUtilizadas: string, idCuadro: number, labor: string,
        observacion: string,justificacion: string, idFinca:number){

            this.cultivoAnterior=cultivoAnterior;
            this.herramientasUtilizadas=herramientasUtilizadas;
            this.idCuadro=idCuadro;
            this.labor=labor;
            this.observacion=observacion;
            this.justificacion=justificacion;
            this.idFinca=idFinca;

    }

  
}
