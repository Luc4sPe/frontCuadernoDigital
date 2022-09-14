import { LaborSuelo } from "./labor-suelo";

export class Cuadro {
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
