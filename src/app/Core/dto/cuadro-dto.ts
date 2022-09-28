import { LaborSuelo } from "../modelo/labor-suelo";

export class CuadroDto {
    idCuadro?:number;
    numeroCuadro:string;
    superficieHectarea:number;
    laboresDeSuelo: LaborSuelo[]=[];
    fechaCreacionCuadro: Date = new Date();
    fechaModificacionCuadro: Date = new Date();

    constructor(numeroCuadro:string, superficieHectarea:number,){
        this.numeroCuadro=numeroCuadro;
        this.superficieHectarea=superficieHectarea;

    }
}
