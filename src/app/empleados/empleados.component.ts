import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  empleados: Empleado[]=[];

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(
      empleados => this.empleados = empleados
    );
  }

  delete(empleado:Empleado):void{
    //console.log("Listo para borrar")
    this.empleadoService.delete(empleado.personaId).subscribe(
      res=>this.empleadoService.getEmpleados().subscribe(
        response=>this.empleados=response
      )
    );

      }

}
