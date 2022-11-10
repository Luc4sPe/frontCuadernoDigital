export class ModificarCuadroDto {

    numeroCuadro:string;
    superficieHectarea:number;


    constructor(numeroCuadro:string, superficieHectarea:number,){
        this.numeroCuadro=numeroCuadro;
        this.superficieHectarea=superficieHectarea;
       
    }
}
