import { Component, OnInit } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente';
import { Form1Component } from './form1.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[]=[];
  constructor(private clienteService: ClienteService ) { }


  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(

      clientes => this.clientes = clientes

    );

  }

 

  delete(cliente:Cliente):void{
    //console.log("Listo para borrar")
    this.clienteService.delete(cliente.personaId).subscribe(
      res=>this.clienteService.getClientes().subscribe(
        response=>this.clientes=response
      )
    );

  }




}
