import { Cuadro } from "./cuadro";
import { Finca } from "./finca";
import { Usuario } from "./usuario";

export class AsesoriaRiego {

    id?: number;
    duracionEnHoras: Date;
    milimetrosAplicados:number;
    idCuadros: Cuadro;
    finca: Finca;
    productor: Usuario
    fechaRiego: Date = new Date();
    fechaModificacionRiego: Date = new Date();
    
    constructor( duracionEnHoras: Date,milimetrosAplicados:number, idCuadros: Cuadro,finca: Finca,  productor: Usuario){

        this.duracionEnHoras=duracionEnHoras;
        this.milimetrosAplicados=milimetrosAplicados;
        this.idCuadros=idCuadros;
        this.finca=finca;
        this.productor=productor;
          
    }
   
}
