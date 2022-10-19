import { Cuadro } from "../modelo/cuadro";

export class PlantacionDto {
    entreIleras: number;
    entrePlantas: number;
    numerosDeCuadros: Cuadro [];
    observacion: string;
    sistemaRiego: string;
    sistemaTrasplante: string;
    tipoCultivo: number;
    cantidadPlantines: number;
    idFinca:number;
}
