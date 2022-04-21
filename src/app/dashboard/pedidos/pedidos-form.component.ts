import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { FacturaEnc } from './facturaEnc';
import { estadoPedido, PedidosComponent } from './pedidos.component';


import { PedidosService } from './pedidos.service';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.css']
})
export class PedidosFormComponent implements OnInit {

  public estadoPedido = estadoPedido;
  public factEnc: number = 0;
  public factuEnc: FacturaEnc = new FacturaEnc();
  




  selectEstado: String = "";
  constructor(private pedidosService: PedidosService,

    public dialogRef: MatDialogRef<PedidosComponent>

  ) {

  }

  ngOnInit(): void {
    this.cargar()
  }

  cargar(): void {

    if (this.factEnc) {
      this.pedidosService.get(this.factEnc).subscribe(
        factEnc => this.factuEnc = factEnc
      );
    }
  }

  public update(detalleId: number):void {
    console.log(this.factuEnc.facturaDetalle.estado )
    this.pedidosService.updateDetalle(this.factuEnc.facturaDetalle,detalleId).subscribe(
      cancelar => this.cancelar()
    )
  }


  public cancelar(): void {
  this.dialogRef.close();
}
  
}
