import { Injectable } from '@angular/core';
import {Pedidos } from './pedidos'
import { map, Observable, of } from 'rxjs';
import{HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private urlEndPoint:string = 'http://localhost:8080/api/pedidos';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getPedidos(): Observable<Pedidos[]> {
    //return of(pedidos)
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Pedidos[])
      );
  }

  delete(idProducto:number):Observable<Pedidos>{
    return this.http.delete<Pedidos>(this.urlEndPoint+'/'+idProducto)
  }
}
