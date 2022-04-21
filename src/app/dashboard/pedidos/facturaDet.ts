import { FacturaEnc } from "./facturaEnc";
import { Productos } from "../productos/productos";

export class FacturaDet {
    idDetalle: number = 0;
    cantidad: String = "";
    precio: String = "";
    estado: String = "";
    producto: Productos = new Productos();
}