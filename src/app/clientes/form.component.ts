import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente:Cliente = new Cliente()
  public titulo:string="Crear Cliente"
  constructor(private clienteService: ClienteService, private router:Router, private activatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargar();
  }
  cargar():void{
    this.activatedRouter.params.subscribe(
      c=>{
        let id=c['id'];
        if(id){
          this.clienteService.get(id).subscribe(
            cliente=>this.cliente=cliente
          );
        }
      }
    )  
    }
    public create():void{
      this.clienteService.create(this.cliente).subscribe(
        cliente => {this.router.navigate(['./clientes'])
  
        //Swal.fire('Cliente guardado', `Cliente${cliente.nombre} guardo con éxito`,'success')
      }
      )
      //console.log("ha realizado un clic")
      //console.log(this.cliente)
    }

    public abrirForm():void{
      const form = this.create ;
    }

  update():void{
    this.clienteService.update(this.cliente).subscribe(
      response => this.router.navigate(['./clientes'])
    );
  }

}
