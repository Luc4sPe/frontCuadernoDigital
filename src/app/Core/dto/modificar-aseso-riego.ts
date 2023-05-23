import { Cuadro } from "../modelo/cuadro";

export class ModificarAsesoRiego {

    duracionEnHoras: Date;
    milimetrosAplicados:number;
    idFinca:number;
    idCuadro:number;
    nombreProductor: string;

    constructor( duracionEnHoras: Date,milimetrosAplicados:number,idFinca: number, idCuadro: number ,nombreProductor: string){

        this.duracionEnHoras=duracionEnHoras;
        this.milimetrosAplicados=milimetrosAplicados;
        this.idFinca=idFinca;
        this.idCuadro=idCuadro;
        this.nombreProductor=nombreProductor;
        
         
    }
}
