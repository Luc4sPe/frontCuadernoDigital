export class EditarRiego {

    duracionEnHoras: Date;
    milimetrosAplicados:number;
    numeroDeCuadro: number;
    observacionAsesor: string;
    semanaAplicada: number;
    semanaTransplante: number;
    nombreUsuario: string;

    constructor(duracionEnHoras: Date,milimetrosAplicados:number, numeroDeCuadro: number,
        observacionAsesor: string, semanaAplicada: number, semanaTransplante: number, nombreUsuario: string){

            this.duracionEnHoras=duracionEnHoras;
            this.milimetrosAplicados=milimetrosAplicados;
            this.numeroDeCuadro=numeroDeCuadro;
            this.observacionAsesor=observacionAsesor;
            this.semanaAplicada=semanaAplicada;
            this.semanaTransplante=semanaTransplante;
            this.nombreUsuario=nombreUsuario;
    }
}
