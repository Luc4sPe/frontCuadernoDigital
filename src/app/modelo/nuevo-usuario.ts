export class NuevoUsuario {

    nombre: string;
    apellido: string;
    dni:string;
    nombreUsuario: string;
    email: string;
    password: string;
    authorities: string[]=[]; 
    roles: string[]=[];
    activo:boolean = false;
    fechaCreacion:Date = new Date();
    fechaActualizacion:Date = new Date();
    tokenPassword: string = '';

    
    
    
    constructor(nombre: string, apellido: string , dni: string,nombreUsuario: string, email:string, password: string){
        this.nombre=nombre;
        this.apellido=apellido;
        this.dni=dni;
        this.nombreUsuario=nombreUsuario;
        this.email=email;
        this.password=password;
        

    }

}
