export class ProductorDto {

    nombre: string;
    apellido: string;
    dni: string;
    nombreUsuario: string;
    email: string;
    telefono: string;
    password: string;
    
    constructor(nombre: string, apellido: string, dni: string, nombreUsuario: string, email: string, telefono: string,
        password: string,){

            this.nombre=nombre;
            this.apellido=apellido;
            this.dni=dni;
            this.nombreUsuario=nombreUsuario;
            this.email=email;
            this.telefono=telefono;
            this.password=password;

    }
}
