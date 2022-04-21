import { FacturaDet } from "./facturaDet";
import { Cliente } from "../clientes/clientes";


export class FacturaEnc {
    idFactura: number = 0;
    fecha: String = "";
    total: number = 0;
    forma_pago: string = "";
    persona: Cliente = new Cliente();
    facturaDetalle : FacturaDet = new FacturaDet();
}