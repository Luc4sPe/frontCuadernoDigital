export class ModificarAsesoriaAgroquimicoDto {

    idAgroquimico: number;
    idCuadro:number;
    dosisPorHectaria:string;
    dosisPorHl:string;
    volumenPorHectaria:string;
    objetivo: string;
    plaga:string;
    fechaEstimadaAplicacion:string;
    idFinca: number;
    nombreProductor:string;

    constructor(idAgroquimico: number,idCuadro:number, dosisPorHectaria:string, dosisPorHl:string, volumenPorHectaria:string, objetivo: string,
        plaga:string,fechaEstimadaAplicacion:string, idFinca: number,nombreProductor:string){

            this.idAgroquimico=idAgroquimico;
            this.idCuadro=idCuadro;
            this.dosisPorHectaria=dosisPorHectaria;
            this.dosisPorHl=dosisPorHl;
            this.volumenPorHectaria=volumenPorHectaria;
            this.objetivo=objetivo;
            this.plaga=plaga;
            this.fechaEstimadaAplicacion=fechaEstimadaAplicacion;
            this.idFinca=idFinca;
            this.nombreProductor=nombreProductor;

    }
}
