export class Cultivo {
    idCultivo?: number;
    nombre: string;
    remito: string;
    variedadCultivo: string;
    viveroProvedor: string;
    fechaCreacion: Date = new Date();
    fechaModificacion: Date = new Date();
    tiempoDeCultivo: number;

    constructor(nombre: string, remito: string, variedadCultivo: string,
         viveroProvedor: string, tiempoDeCultivo: number ){

            this.nombre=nombre;
            this.remito=remito;
            this.variedadCultivo=variedadCultivo;
            this.viveroProvedor=viveroProvedor;
            this.tiempoDeCultivo=tiempoDeCultivo;

    }
}
