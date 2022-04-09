import { Injectable } from '@angular/core';

import { Empleados } from './empleados';
import { Observable, of } from 'rxjs';

import { HttpClient,  HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  private urlEndPoint:string ='http://localhost:8080/api/personas';
  private urlEndPoint2:string ='http://localhost:8080/api/personas';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})


  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<Empleados[]> {
    //return of(empleados)
    //return this.http.get<Empleados[]>(this.urlEndPoint);

    return this.http.get(this.urlEndPoint).pipe(
     map(response => response as Empleados[]) 
    );
  }

  get(personaId: number):Observable<Empleados>{
    return this.http.get<Empleados>(this.urlEndPoint+'/'+personaId)
  }

  create(empleados: Empleados): Observable<Empleados>{
    return this.http.post<Empleados>(this.urlEndPoint, empleados,{headers: this.httpHeaders})
  }
  update(empleados:Empleados, personaId: number):Observable<Empleados>{
    return this.http.put<Empleados>(this.urlEndPoint+'/'+personaId,empleados)
  }
  //eliminar
  delete(personaId:number):Observable<Empleados>{
    return this.http.delete<Empleados>(this.urlEndPoint+'/'+personaId)
  }
}