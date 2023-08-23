import { Cuadro } from "./cuadro";
import { Cultivo } from "./cultivo";

export class Plantacion {
    idPlantacion?: number;
    entreIleras: number;
    entrePlantas: number;
    fechaCreacionPlantacion: Date = new Date();
    fechaModificacionPlantacion: Date = new Date();
    cuadro: Cuadro;
    observacion: string;
    justificacion: string;
    sistemaRiego: string;
    sistemaTrasplante: string;
    nombreTipoCultivo: Cultivo;
    cantidadPlantines: number;
    fechaCosecha: Date;

    constructor(entreIleras: number, entrePlantas: number, cuadro: Cuadro,observacion: string, justificacion: string,
         sistemaRiego: string, sistemaTrasplante: string, nombreTipoCultivo: Cultivo, cantidadPlantines: number){

            this.entreIleras=entreIleras;
            this.entrePlantas=entrePlantas;
            this.cuadro=cuadro;
            this.observacion=observacion;
            this.justificacion=justificacion;
            this.sistemaRiego=sistemaRiego;
            this.sistemaTrasplante=sistemaTrasplante;
            this.nombreTipoCultivo=nombreTipoCultivo;
            this.cantidadPlantines=cantidadPlantines;

    }
}
