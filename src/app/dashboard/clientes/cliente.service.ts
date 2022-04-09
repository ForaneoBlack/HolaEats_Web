import { Injectable } from '@angular/core';
import { Cliente } from './clientes';
import { map, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/personas';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor (private http: HttpClient){}

  getClientes(): Observable<Cliente[]> {
    //return of(cliente)
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );
  }


  get(personaId: number):Observable<Cliente>{
    return this.http.get<Cliente>(this.urlEndPoint+'/'+personaId)
  }

  create(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente,{headers: this.httpHeaders})
  }

  update(cliente:Cliente, personaId: number):Observable<Cliente>{
    return this.http.put<Cliente>(this.urlEndPoint+'/'+personaId, cliente)
  }
  //eliminar
  delete(personaId:number):Observable<Cliente>{
    return this.http.delete<Cliente>(this.urlEndPoint+'/'+personaId)
  }
}