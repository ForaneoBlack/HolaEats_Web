export class Cliente {
    personaId!:number;
    cedula!: number;
    nombre: String | undefined;
    apellido: string | undefined;
    correo: string | undefined;
    telefono: string | undefined; 
    direccion!: string;
    rol: string ="Cliente";

}
