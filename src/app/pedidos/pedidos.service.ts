import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pedidos } from './pedidos';
import { pedidos } from './pedidos.json';
import{HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private urlEndPoint:string = 'http://localhost:8080/api/pedidos'; 

  constructor(private http:HttpClient) { }

  getPedidos(): Observable<Pedidos[]>
  {
    //return this.http.get<Pedidos[]>(this.urlEndPoint);

    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Pedidos[]));

  }
}
