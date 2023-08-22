export class ModificarCultivoDto {
    idCultivo?: number;
    nombre: string;
    remito: string;
    variedadCultivo: string;
    viveroProvedor: string;
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
