import { Cuadro } from "./cuadro";
import { Finca } from "./finca";
import { Usuario } from "./usuario";

export class AsesoriaRiego {

    id?: number;
    duracionEnHoras: Date;
    milimetrosAplicados:number;
    finca: Finca;
    cuadro: Cuadro;
    productor: Usuario
    fechaAsesoriaRiego: Date = new Date();
    fechaModificacionAsesoriaRiego: Date = new Date();
    fechaAplicacionAsesoria: Date = new Date();
    asesoriaAplicada: boolean = true;
    fechaEstimadaAplicacionParsed: Date = new Date();
    
    constructor( duracionEnHoras: Date,milimetrosAplicados:number,finca: Finca,cuadro: Cuadro,productor: Usuario){

        this.duracionEnHoras=duracionEnHoras;
        this.milimetrosAplicados=milimetrosAplicados;
        this.finca=finca;
        this.cuadro=cuadro;
        this.productor=productor;
          
    }
   
}
