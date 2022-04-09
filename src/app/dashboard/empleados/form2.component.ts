import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleados } from './empleados';
import { EmpleadosComponent, rolesEmpleados } from './empleados.component';
import { EmpleadosService } from './empleados.service';

@Component({ 
  selector: 'app-form2',
  templateUrl: './form2.component.html'
})
export class Form2Component implements OnInit {

  public rolesEmpleados = rolesEmpleados ;
  public Empleados: Empleados = new (Empleados);
  public personaId: number = 0;
  selectRole: string = "";
  
  public titulo: String = "Crear Empleados"

  constructor(private empleadosService: EmpleadosService, private router: Router, 
    private activatedRouter: ActivatedRoute,
    public dialogRef: MatDialogRef<EmpleadosComponent>) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    
        if (this.personaId) {
          this.empleadosService.get(this.personaId).subscribe(
            empleados => this.Empleados = empleados
          );
        }
      
    
  }
public create(): void {
 
  this.empleadosService.create(this.Empleados).subscribe(
    cancelar => this.cancelar()
  )
}

public update(personaId: number):void {
  this.empleadosService.update(this.Empleados,personaId).subscribe(
    cancelar => this.cancelar()
  )
}

public cancelar(): void{
  this.dialogRef.close();
}
}
