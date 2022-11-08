import { Cuadro } from "../modelo/cuadro";
import { Finca } from "../modelo/finca";


export class LaborSueloDto {
    id?: number;
    herramientasUtilizadas: string;
    idCuadro: number;
    labor: string;
    observacion: string;
    idFinca: number;
    cultivoAnterior: string;
    
}
