import { Agroquimico } from "./agroquimico";
import { Cuadro } from "./cuadro";
import { Finca } from "./finca";

export class AplicacionAgroquimico {
    id?:number;
    agroquimico:Agroquimico;
    cuadro:Cuadro;
    dosisPorHectaria:number;
    dosisPorHl:number;
    volumenPorHectaria:number;
    objetivo:string;
    observaciones:string;
    justificacion:string;
    plaga:string;
    fechaDeAplicacion: Date = new Date();
    fechaModificacion: Date = new Date();
    finca:Finca;

    constructor(agroquimico:Agroquimico,cuadro:Cuadro,dosisPorHectaria:number,dosisPorHl:number,volumenPorHectaria:number,objetivo:string,
        observaciones:string,justificacion:string,plaga:string,finca:Finca){

            this.agroquimico=agroquimico;
            cuadro=cuadro;
            dosisPorHectaria=dosisPorHectaria;
            dosisPorHl=dosisPorHl;
            volumenPorHectaria=volumenPorHectaria;
            objetivo=objetivo;
            observaciones=observaciones;
            justificacion=justificacion;
            plaga=plaga;
            finca=finca;
    }

}
