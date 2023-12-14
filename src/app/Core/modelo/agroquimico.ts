export class Agroquimico {
    id?:number;
    nombreComercial: string;
    formulaYconcentracion: string;
    principioActivo: string;
    tipo: string;
    tiempoDeCarencia: number;
    dosisPorHectaria: string;
    dosisPorHl: string;
    volumenPorHectaria: string;
     numLote: string
   

    fechaCreacionAgro: Date = new Date();
    fechaModificacionAgro: Date = new Date();

    constructor(nombreComercial: string,formulaYconcentracion: string,principioActivo: string,tipo: string,tiempoDeCarencia: number,
        dosisPorHectaria: string,dosisPorHl: string,volumenPorHectaria: string, numLote: string ){

            this.nombreComercial=nombreComercial;
            this.formulaYconcentracion=formulaYconcentracion;
            this.principioActivo=principioActivo;
            this.tipo=tipo;
            this.tiempoDeCarencia=tiempoDeCarencia;
            this.dosisPorHectaria=dosisPorHectaria;
            this.dosisPorHl=dosisPorHl;
            this.volumenPorHectaria=volumenPorHectaria;
            this.numLote=numLote;
            

    }
}
