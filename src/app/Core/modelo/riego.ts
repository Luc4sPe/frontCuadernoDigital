import { Usuario } from "./usuario";

export class Riego {
    id?: number;
    duracionEnHoras: Date;
    fechaAplicacion: Date = new Date();
    milimetrosAplicados:number;
    numeroDeCuadro: number;
    observacionAsesor: string;
    observacionProductor: string;
    semanaAplicada: number;
    semanaTransplante: number;
    nombreUsuario: Usuario;

    constructor(duracionEnHoras: Date,milimetrosAplicados:number, numeroDeCuadro: number, observacionAsesor: string,
        observacionProductor: string, semanaAplicada: number, semanaTransplante: number, nombreUsuario: Usuario){

            this.duracionEnHoras=duracionEnHoras;
            this.milimetrosAplicados=milimetrosAplicados;
            this.numeroDeCuadro=numeroDeCuadro;
            this.observacionAsesor=observacionAsesor;
            this.observacionProductor=observacionProductor;
            this.semanaAplicada=semanaAplicada;
            this.semanaTransplante=semanaTransplante;
            this.nombreUsuario=nombreUsuario;
    }
    
}
