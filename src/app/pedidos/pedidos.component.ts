import { Component, OnInit } from '@angular/core';
import { Pedidos } from './pedidos';
import { PedidosService } from './pedidos.service';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']

})
export class PedidosComponent implements OnInit {

  Pedidos: Pedidos [] = [];

  constructor(private pedidosService: PedidosService) { }

  ngOnInit() {
    this.pedidosService.getPedidos ().subscribe(
      pedidos => this.Pedidos = pedidos
    );
  }


  

}
