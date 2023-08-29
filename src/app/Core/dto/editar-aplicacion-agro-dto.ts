export class EditarAplicacionAgroDto {

    id?:number;
    idAgroquimico:number;
    idCuadro:number;
    dosisPorHectaria:string;
    dosisPorHl:string;
    volumenPorHectaria:string;
    objetivo:string;
    observaciones:string;
    justificacion:string;
    plaga:string;
   
    constructor(idAgroquimico:number,idCuadro:number,dosisPorHectaria:string,dosisPorHl:string,volumenPorHectaria:string,objetivo:string,
        observaciones:string,justificacion:string,plaga:string){
           
            this.idAgroquimico=idAgroquimico;
            this.idCuadro=idCuadro;
            this.dosisPorHectaria=dosisPorHectaria;
            this.dosisPorHl=dosisPorHl;
            this.volumenPorHectaria=volumenPorHectaria;
            this.objetivo=objetivo;
            this.observaciones=observaciones;
            this.justificacion=justificacion;
            this.plaga=plaga;
            
    }
}
