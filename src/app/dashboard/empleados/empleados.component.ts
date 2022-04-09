import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Form2Component } from './form2.component';

import { Empleados } from './empleados';

import { EmpleadosService } from './empleados.service';

export const rolesEmpleados = ['Mesero', 'Administrador', 'Repartidor'];

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})

export class EmpleadosComponent implements OnInit {

  displayedColumns: string[] = ['personaId', 'cedula', 'nombre', 'apellido', 'correo', 'telefono', 'direccion', 'rol', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<Empleados>;

  empleados: Empleados[] = [];
  empleadosfilter: Empleados[] = [];


  constructor(private EmpleadosService: EmpleadosService,
    public dialog: MatDialog

  ) { }


  ngOnInit() {
    this.cargarEmpleados();
  }

  cargarEmpleados() {
    this.EmpleadosService.getEmpleados().subscribe(
      empleados => {
        this.empleados = empleados.filter(empleado => rolesEmpleados.includes(empleado.rol));
        this.dataSource = new MatTableDataSource(this.empleados);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      })

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(personaId: number) {
    this.EmpleadosService.delete(personaId).subscribe(
      res => this.EmpleadosService.getEmpleados().subscribe(
        response => this.cargarEmpleados()
      )
    );
  }

  openDialog(personaId: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "70%";
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(Form2Component, dialogConfig);

    dialogRef.componentInstance.personaId = personaId;
    dialogRef.afterClosed().subscribe(result => {
      this.cargarEmpleados()

    });
  }
}

