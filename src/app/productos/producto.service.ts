import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { from, Observable } from 'rxjs';

import {HttpClient, HttpClientModule,HttpHeaders} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlEndPoint:string='http://localhost:8080/api/productos'
  private httpHeaders=new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http:HttpClient) { }

  getProductos(): Observable<Producto[]>{

    return this.http.get<Producto[]>(this.urlEndPoint);
  }

  create(producto:Producto):Observable<Producto>{
    return this.http.post<Producto>(this.urlEndPoint, producto,{headers:this.httpHeaders})
  }

  getProducto(id: any):Observable<Producto>{
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`);
  }
  updateProducto(productos:Producto):Observable<Producto>{
    return this.http.put<Producto>(this.urlEndPoint,productos);

}

  deleteProducto(id :any):Observable<Producto>{
  return this.http.delete<Producto>(`${this.urlEndPoint}/${id}`);

}

  
}
