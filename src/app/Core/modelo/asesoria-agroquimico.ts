import { Agroquimico } from "./agroquimico";
import { Cuadro } from "./cuadro";
import { Finca } from "./finca";
import { Usuario } from "./usuario";

export class AsesoriaAgroquimico {

    id?:number;
    agroquimico:Agroquimico;
    cuadro:Cuadro;
    dosisPorHectaria:string;
    dosisPorHl:string;
    volumenPorHectaria:string;
    objetivo:string;
    plaga:string;
    fechaAsesoriaAgroquimico: Date = new Date();
    fechaModificacionAsesoriaAgroquimico: Date = new Date();
    fechaAplicacionAsesoria: Date = new Date();
    fechaEstimadaAplicacionParsed: Date = new Date();
    finca:Finca;
    productor: Usuario;
    asesoriaAplicada: boolean = true;
    nombreEncargado: string;


    constructor(agroquimico:Agroquimico,cuadro:Cuadro,dosisPorHectaria:string,dosisPorHl:string,volumenPorHectaria:string,objetivo:string,
        plaga:string,finca:Finca,productor: Usuario){

            this.agroquimico=agroquimico;
            this.cuadro=cuadro;
            this.dosisPorHectaria=dosisPorHectaria;
            this.dosisPorHl=dosisPorHl;
            this.volumenPorHectaria=volumenPorHectaria;
            this.objetivo=objetivo;
            this.plaga=plaga;
            this.finca=finca;
            this.productor=productor;

        }
            

}
   
