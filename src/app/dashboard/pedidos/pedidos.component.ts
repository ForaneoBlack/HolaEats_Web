import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import { Pedidos } from './pedidos';

import { PedidosService } from './pedidos.service';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent implements OnInit {
  displayedColumns: string[] = ['idPedido', 'tipoPago', 'estado', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;

  pedidos: Pedidos[] = [];

  constructor(private PedidosService: PedidosService) {}

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
      (pedidos) => (this.pedidos = pedidos)
    );
    this.dataSource = new MatTableDataSource(this.pedidos);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarPedido(pedido: Pedidos): void {
    this.PedidosService.delete(pedido.idPedido).subscribe((res) =>
      this.PedidosService.getPedidos().subscribe(
        (response) => (this.pedidos = response)
      )
    );
  }
}
