import { Cuadro } from "../modelo/cuadro";
import { Cultivo } from "../modelo/cultivo";

export class ModificarPlantacionDto {
    entreIleras: number;
    entrePlantas: number;
    idCuadro: number;
    observacion: string;
    justificacion: string;
    sistemaRiego: string;
    sistemaTrasplante: string;
    tipoCultivo: number;
    cantidadPlantines: number;
   

    constructor(entreIleras: number, entrePlantas: number,  idCuadro: number ,observacion: string, justificacion: string,
        sistemaRiego: string, sistemaTrasplante: string, tipoCultivo: number, cantidadPlantines: number){

           this.entreIleras=entreIleras;
           this.entrePlantas=entrePlantas;
           this.idCuadro=idCuadro;
           this.observacion=observacion;
           this.justificacion=justificacion;
           this.sistemaRiego=sistemaRiego;
           this.sistemaTrasplante=sistemaTrasplante;
           this.tipoCultivo=tipoCultivo
           this.cantidadPlantines=cantidadPlantines;

   }
}
