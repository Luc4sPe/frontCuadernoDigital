export class EditarUsuariosDto {
    id?: number;
    nombre: string;
    apellido: string;
    dni: string;
    nombreUsuario: string;
    email: string;
    roles: string[]=[];

    constructor( nombre: string,apellido: string,dni: string, nombreUsuario: string,email: string, roles: string[]){
            this.nombre=nombre;
            this.apellido=apellido;
            this.dni=dni;
            this.nombreUsuario=nombreUsuario;
            this.email=email;
            this.roles=roles;
    }

}
