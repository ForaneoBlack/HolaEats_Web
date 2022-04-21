export class Cliente {
    personaId!:number;
    cedula!: String;
    nombre: String | undefined;
    apellido: string | undefined;
    correo: string | undefined;
    telefono: string | undefined; 
    direccion!: string;
    rol: string ="Cliente";
}
