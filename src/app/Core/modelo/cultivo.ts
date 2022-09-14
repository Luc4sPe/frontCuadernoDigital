export class Cultivo {
    idCultivo?: number;
    nombre: string;
    remito: string;
    timpoCarencia: number;
    variedadCultivo: string;
    viveroProvedor: string;
    fechaCreacion: Date = new Date();
    fechaModificacion: Date = new Date();

    constructor(nombre: string, remito: string,timpoCarencia: number, variedadCultivo: string,
         viveroProvedor: string ){

            this.nombre=nombre;
            this.remito=remito;
            this.timpoCarencia=timpoCarencia;
            this.variedadCultivo=variedadCultivo;
            this.viveroProvedor=viveroProvedor;

    }
}
