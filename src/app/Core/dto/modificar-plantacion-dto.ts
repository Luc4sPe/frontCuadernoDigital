import { Cuadro } from "../modelo/cuadro";

export class ModificarPlantacionDto {
    entreIleras: number;
    entrePlantas: number;
    numerosDeCuadros: Cuadro [];
    observacion: string;
    justificacion: string;
    sistemaRiego: string;
    sistemaTrasplante: string;
    tipoCultivo: number;
    cantidadPlantines: number;
    idFinca:number;

    constructor(entreIleras: number, entrePlantas: number, observacion: string, justificacion: string,
        sistemaRiego: string, sistemaTrasplante: string, tipoCultivo: number, cantidadPlantines: number){

           this.entreIleras=entreIleras;
           this.entrePlantas=entrePlantas;
           this.observacion=observacion;
           this.justificacion=justificacion;
           this.sistemaRiego=sistemaRiego;
           this.sistemaTrasplante=sistemaTrasplante;
           this.tipoCultivo=tipoCultivo
           this.cantidadPlantines=cantidadPlantines;

   }
}
