import { Cuadro } from "./cuadro";
import { Cultivo } from "./cultivo";

export class Plantacion {
    idPlantacion?: number;
    entreIleras: number;
    entrePlantas: number;
    fechaCreacionPlantacion: Date = new Date();
    fechaModificacionPlantacion: Date = new Date();
    numerosDeCuadros: Cuadro []=[];
    observacion: string;
    justificacion: string;
    sistemaRiego: string;
    sistemaTrasplante: string;
    nombreTipoCultivo: Cultivo;
    cantidadPlantines: number;

    constructor(entreIleras: number, entrePlantas: number, observacion: string, justificacion: string,
         sistemaRiego: string, sistemaTrasplante: string, nombreTipoCultivo: Cultivo, cantidadPlantines: number){

            this.entreIleras=entreIleras;
            this.entrePlantas=entrePlantas;
            this.observacion=observacion;
            this.justificacion=justificacion;
            this.sistemaRiego=sistemaRiego;
            this.sistemaTrasplante=sistemaTrasplante;
            this.nombreTipoCultivo=nombreTipoCultivo;
            this.cantidadPlantines=cantidadPlantines;

    }
}
