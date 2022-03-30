import { Component, OnInit } from '@angular/core';
import { Empleado } from './empleado';
import { EmpleadoService } from './empleado.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit {

 public empleado:Empleado = new Empleado()
  public titulo:string="Crear Empleado"


  constructor(private empleadoService:EmpleadoService, private router:Router, private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar():void{
    this.activatedRouter.params.subscribe(
      c=>{
        let personaId=c['personaId'];
        if(personaId){
          this.empleadoService.get(personaId).subscribe(
            empleado=>this.empleado=empleado
          );
        }
      }
    ) 

    }

  

  public create(): void{

    this.empleadoService.create(this.empleado).subscribe(
      response => this.router.navigate(['/empleados'])
    )

  }

  update():void{
    this.empleadoService.update(this.empleado).subscribe(
      response => this.router.navigate(['./empleados'])
    );
  }

}
