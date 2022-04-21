import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleados } from './empleados';
import { EmpleadosComponent, rolesEmpleados } from './empleados.component';
import { EmpleadosService } from './empleados.service';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

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

  form;
  constructor(private empleadosService: EmpleadosService, private router: Router, 
    private activatedRouter: ActivatedRoute,
    public dialogRef: MatDialogRef<EmpleadosComponent>,
    private formBuilder: FormBuilder
    ) { 
      this.form = formBuilder.group({
        cedula: ['', Validators.required],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        correo: ['', Validators.required],
        telefono: ['', Validators.required],
        direccion: ['', Validators.required]
      })
    }

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
  if (this.form.valid){
    this.empleadosService.create(this.Empleados).subscribe(
      cancelar => this.cancelar()
    )
    Swal.fire('Empleado guardado', `El empleado ${this.Empleados.nombre} se a creado con éxito`,'success')
  }else{
    alert('Revise que los campos esten llenados correctamente')
  }
  
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
