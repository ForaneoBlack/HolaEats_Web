import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/personas'; 
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

 //obtener 
 getClientes(): Observable<Cliente[]>{
  // return of (CLIENTES);
 // return this.http.get<Cliente[]>(this.urlEndPoint);
 return this.http.get(this.urlEndPoint).pipe(
   map(response => response as Cliente[])
 )
 }
//crear
create(cliente: Cliente):Observable<Cliente>{
  return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders})
}

//obtener id 
get(id: number):Observable<Cliente>{
  return this.http.get<Cliente>(this.urlEndPoint+'/'+id)
}

//actualizar
update(cliente:Cliente):Observable<Cliente>{
  return this.http.put<Cliente>(this.urlEndPoint, cliente)
}

//eliminar
delete(id:number):Observable<Cliente>{
  return this.http.delete<Cliente>(this.urlEndPoint+'/'+id)
}
}
