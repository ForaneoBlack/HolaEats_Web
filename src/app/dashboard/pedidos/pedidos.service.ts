import { Injectable } from '@angular/core';
import {FacturaDet } from './facturaDet'
import { map, Observable, of } from 'rxjs';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { FacturaEnc } from './facturaEnc';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private urlEndPoint:string = 'http://localhost:8080/api/factura';
  private urlEndPoint2:string = 'http://localhost:8080/api/factura_detalle';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getPedidos(): Observable<FacturaEnc[]> {
    //return of(pedidos)
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as FacturaEnc[])
      );
  }
  get(idDetalle: number):Observable<FacturaEnc>{
    return this.http.get<FacturaEnc>(this.urlEndPoint+'/'+idDetalle)
  }
  update(pedidos:FacturaEnc, idDetalle: number):Observable<FacturaEnc>{
    return this.http.put<FacturaEnc>(this.urlEndPoint+'/'+idDetalle,pedidos)
  }
  updateDetalle(pedidos:FacturaDet, idDetalle: number):Observable<FacturaDet>{
    return this.http.put<FacturaDet>(this.urlEndPoint2+'/'+idDetalle,pedidos)
  }

  delete(idDetalle:number):Observable<FacturaEnc>{
    return this.http.delete<FacturaEnc>(this.urlEndPoint+'/'+idDetalle)
  }
}
