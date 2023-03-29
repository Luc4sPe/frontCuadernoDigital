import { Cuadro } from "../modelo/cuadro";
import { Finca } from "../modelo/finca";
import { Usuario } from "../modelo/usuario";

export class AsesoriaRiegoDto {
    duracionEnHoras: Date;
    milimetrosAplicados:number;
    idCuadros: Cuadro;
    finca: Finca;
    productor: Usuario
}
