import { Cuadro } from "../modelo/cuadro";

export class PlantacionDto {
    entreIleras: number;
    entrePlantas: number;
    numerosDeCuadros: Cuadro []=[];
    observacion: string;
    justificacion: string;
    sistemaRiego: string;
    sistemaTrasplante: string;
    tipoCultivo: string;
    cantidadPlantines: number;
}
