export class NuevoUsuario {

    nombre: string;
    apellido: string;
    nombreUsuario: string;
    email: string;
    password: string;
    authorities: string[]=[]; 
    roles: string[]=[];
    
    
    
    constructor(nombre: string, apellido: string , nombreUsuario: string, email:string, password: string){
        this.nombre=nombre;
        this.apellido=apellido;
        this.nombreUsuario=nombreUsuario;
        this.email=email;
        this.password=password;
        

    }

}
