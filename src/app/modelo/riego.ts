import { Usuario } from "../dto/usuario";

export class Riego {
    id?: number;
    duracionEnHoras: Date;
    fechaAplicacion: Date = new Date();
    milimetrosAplicados:number;
    numeroDeCuadro: number;
    observacionProductor: string;
    semanaAplicada: number;
    semanaTransplante: number;
    nombreUsuario: Usuario;

    constructor(duracionEnHoras: Date,milimetrosAplicados:number, numeroDeCuadro: number,
        observacionProductor: string, semanaAplicada: number, semanaTransplante: number, nombreUsuario: Usuario){

            this.duracionEnHoras=duracionEnHoras;
            this.milimetrosAplicados=milimetrosAplicados;
            this.numeroDeCuadro=numeroDeCuadro;
            this.observacionProductor=observacionProductor;
            this.semanaAplicada=semanaAplicada;
            this.semanaTransplante=semanaTransplante;
            this.nombreUsuario=nombreUsuario;
    }
    
}
