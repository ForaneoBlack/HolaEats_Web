import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Productos } from './productos';

import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Imagen } from './imagen';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private urlImagen:string="http://localhost:8080/cloudinary/"
  private urlEndPoint:string='http://localhost:8080/api/productos'
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) { }

  public list(): Observable<Imagen[]>{
    return this.http.get<Imagen[]>(this.urlImagen + 'list')
  }
  public upload(imagen: File): Observable<any>{
    const formData = new FormData();
    formData.append('multipartFile', imagen);
    return this.http.post<any>(this.urlImagen + 'upload', formData);
  }

  public deleteImg(id: number): Observable<any> {
    return this.http.delete<any>(this.urlImagen + 'delete/' + id);
  }
  
    getProductos(): Observable<Productos[]>{
      // return this.http.get<Productos[]>(this.urlEndPoint);
      return this.http.get(this.urlEndPoint).pipe(
        map(response => response as Productos[])
      )
    }
    get(idProducto: number):Observable<Productos>{
      return this.http.get<Productos>(this.urlEndPoint+'/'+idProducto)
    }
    create(productos: Productos): Observable<Productos>{
      return this.http.post<Productos>(this.urlEndPoint, productos,{headers: this.httpHeaders})
    }
    update(productos: Productos):Observable<Productos>{
      return this.http.put<Productos>(this.urlEndPoint, productos)
    }
    //eliminar
    delete(idProducto:number):Observable<Productos>{
      return this.http.delete<Productos>(this.urlEndPoint+'/'+idProducto)
    }
}
