import { LaborSuelo } from "./labor-suelo";

export class Cuadro {
    idCuadro?:number;
    numeroCuadro:string;
    superficieHectarea:number;
    laboresDeSuelo: LaborSuelo[]=[];
    fechaCreacionCuadro: Date = new Date();
    fechaModificacionCuadro: Date = new Date();
    cultivoAnterior:string;

    constructor(numeroCuadro:string, superficieHectarea:number, cultivoAnterior:string){
        this.numeroCuadro=numeroCuadro;
        this.superficieHectarea=superficieHectarea;
        this.cultivoAnterior=cultivoAnterior;

    }
    
}
