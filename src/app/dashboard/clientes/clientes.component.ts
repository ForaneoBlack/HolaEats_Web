import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteService } from './cliente.service';
import { Cliente } from './clientes';
import { FormComponent } from './form.component';

const rolCliente = ['Cliente'];
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['personaId','cedula', 'nombre', 'apellido', 'correo', 'telefono', 'direccion','acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource! : MatTableDataSource<Cliente>;

  clientes : Cliente[] = [];

  constructor(private clienteService: ClienteService, public dialog: MatDialog ) { }

  ngOnInit(): void {
   this.cargarClientes();
  }
  cargarClientes(){
    this.clienteService.getClientes().subscribe(
      clientes => {
        this.clientes = clientes.filter(cliente => rolCliente.includes(cliente.rol))
        this.dataSource = new MatTableDataSource(this.clientes)
        this.dataSource.sort =this.sort;
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

  delete(personaId:number):void{
    this.clienteService.delete(personaId).subscribe(
      res => this.clienteService.getClientes().subscribe(
        response => this.cargarClientes()
      )
    )
  }

  openDialog(personaId:number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "70%";
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(FormComponent,dialogConfig);
   
    dialogRef.componentInstance.personaId = personaId;
    dialogRef.afterClosed().subscribe(result => {
     this.cargarClientes()

    });
  }


}
