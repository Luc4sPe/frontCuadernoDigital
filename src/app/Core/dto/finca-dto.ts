import { Usuario } from "../modelo/usuario";

export class FincaDto {
    idFinca:number;
    nombre: string;
    direccion!: string;
    longitud!: number;
    latitud!: number;
    cuadros:[]=[];
    nombreProductor!: string;
    numero!:string;
    superficie!:number



}

