import { Injectable } from '@angular/core';
import { Empleado } from './empleado';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlEndPoint:string='http://localhost:8080/api/personas';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  getEmpleados():Observable<Empleado[]>{
    //return of (EMPLEADOS)
    //return this.http.get<Empleado[]>(this.urlEndPoint);
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Empleado[])
    );
  }

  create(empleado: Empleado):Observable<Empleado>{
    return this.http.post<Empleado>(this.urlEndPoint, empleado, {headers: this.httpHeaders})
  }

  get(personaId: number):Observable<Empleado>{
    return this.http.get<Empleado>(this.urlEndPoint+'/'+personaId)
  }


  update(empleado:Empleado):Observable<Empleado>{
    return this.http.put<Empleado>(this.urlEndPoint, empleado)
  }

  delete(personaId:number):Observable<Empleado>{
    return this.http.delete<Empleado>(this.urlEndPoint+'/'+personaId)
  }



}
