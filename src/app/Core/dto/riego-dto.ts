import { Usuario } from "./usuario";

export class RiegoDto {

    duracionEnHoras: Date;
    milimetrosAplicados:number;
    numeroDeCuadro: number;
    observacionProductor: string;
    semanaAplicada: number;
    semanaTransplante: number;
    nombreUsuario: string;


    constructor(duracionEnHoras: Date,milimetrosAplicados:number, numeroDeCuadro: number,
        observacionProductor: string, semanaAplicada: number, semanaTransplante: number, nombreUsuario: string){

            this.duracionEnHoras=duracionEnHoras;
            this.milimetrosAplicados=milimetrosAplicados;
            this.numeroDeCuadro=numeroDeCuadro;
            this.observacionProductor=observacionProductor;
            this.semanaAplicada=semanaAplicada;
            this.semanaTransplante=semanaTransplante;
            this.nombreUsuario=nombreUsuario;
    }
    


}
