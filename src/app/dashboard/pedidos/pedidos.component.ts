import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';


import { PedidosService } from './pedidos.service';
import { PedidosFormComponent } from './pedidos-form.component';
import Swal from 'sweetalert2';
import { FacturaEnc } from './facturaEnc';

export const estadoPedido = ['Activo', 'Despachado'];
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent implements OnInit {
  displayedColumns: string[] = ['idPedido', 'tipoPago','fecha','estado','total','acciones'];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  dataSource!: MatTableDataSource<any>;

  facturaEnc: FacturaEnc[] = [];

  constructor(private PedidosService: PedidosService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.cargarPedidos();

    this.dataSource.filterPredicate = (pedidos, filter) => {
      return this.displayedColumns.some((ped) => {
        return (
          ped != 'acciones' && pedidos[ped].toLowerCase().indexOf(filter) != -1
        );
      });
    };
  }

  cargarPedidos() {
    this.PedidosService.getPedidos().subscribe(
      facturaEnc => {
        this.facturaEnc = facturaEnc
        console.log(facturaEnc)
        this.dataSource = new MatTableDataSource(this.facturaEnc);
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
  }

  eliminarPedido(facturaEnc: FacturaEnc): void {
    this.PedidosService.delete(facturaEnc.idFactura).subscribe((res) =>
      this.PedidosService.getPedidos().subscribe(
        (response) => (this.facturaEnc = response)
      )
    );
    Swal.fire({
      title: 'Estas seguro de eliminar este pedido?',
      text: "No se podra revertir despues!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Pedido eliminado', `El pedido se a eliminado con éxito`,'error'
        )
      }
    })
  }

  openDialog(factEnc: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "45%";
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(PedidosFormComponent, dialogConfig);

    dialogRef.componentInstance.factEnc = factEnc;
    dialogRef.afterClosed().subscribe(result => {
      this.cargarPedidos();

    });
  }
}