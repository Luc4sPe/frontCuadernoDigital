import { Agroquimico } from "./agroquimico";
import { Cuadro } from "./cuadro";
import { Finca } from "./finca";
import { Plantacion } from "./plantacion";

export class AplicacionAgroquimico {
    id?:number;
    agroquimico:Agroquimico;
    cuadro:Cuadro;
    dosisPorHectaria:string;
    dosisPorHl:string;
    volumenPorHectaria:string;
    objetivo:string;
    observaciones:string;
    justificacion:string;
    plaga:string;
    fechaDeAplicacion: Date = new Date();
    fechaModificacion: Date = new Date();
    finca:Finca;
    plantacion: Plantacion;

    constructor(agroquimico:Agroquimico,cuadro:Cuadro,dosisPorHectaria:string,dosisPorHl:string,volumenPorHectaria:string,objetivo:string,
        observaciones:string,justificacion:string,plaga:string,finca:Finca){

            this.agroquimico=agroquimico;
            this.cuadro=cuadro;
            this.dosisPorHectaria=dosisPorHectaria;
            this.dosisPorHl=dosisPorHl;
            this.volumenPorHectaria=volumenPorHectaria;
            this.objetivo=objetivo;
            this.observaciones=observaciones;
            this.justificacion=justificacion;
            this.plaga=plaga;
            this.finca=finca;
    }

}
