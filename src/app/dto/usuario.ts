export class Usuario {
    id?: number;
    nombre: string;
    apellido: string;
    dni: string;
    nombreUsuario: string;
    email: string;
    password: string;
    roles: string[]=[];
    estadoActivo: boolean = false;
    fechaDeAlta:Date = new Date();
    fechaModificacion:Date = new Date();
    tokenPassword: string = '';


    constructor(nombre: string, apellido: string, dni: string,nombreUsuario: string,email: string, password: string){
        this.nombre=nombre;
        this.apellido=apellido;
        this.dni=dni;
        this.nombreUsuario=nombreUsuario;
        this.email=email;
        this.password=password
    }


}
