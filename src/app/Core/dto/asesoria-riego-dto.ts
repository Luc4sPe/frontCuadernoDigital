import { Cuadro } from "../modelo/cuadro";



export class AsesoriaRiegoDto {
    duracionEnHoras: Date;
    milimetrosAplicados:number;
    numerosDeCuadros: Cuadro [];
    idFinca:number;
    nombreProductor: string;
}
