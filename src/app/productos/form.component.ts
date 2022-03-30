import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public producto:Producto=new Producto()
  public titulo:string="Añadir Nuevo Producto"

  constructor(private productoService:ProductoService,private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarProducto()
  }

  public crear():void{
    this.productoService.create(this.producto).subscribe(
      producto=>{
        this.router.navigate(['/productos'])

        Swal.fire('Producto guardado',`El producto ${producto.nombre} ha sido creado con éxito`,'success')
        
      }
    )
  }

  cargarProducto():void{
    this.activatedRoute.params.subscribe(params=>{
      let id=params['id']
      if(id){
        this.productoService.getProducto(id).subscribe((producto)=>this.producto=producto)
      }
    })
      
  }
  public modificar():void{
    this.productoService.updateProducto(this.producto).subscribe(
      
      cliente=> {this.router.navigate(['/productos'])
      Swal.fire('Producto Actualizado',`El Producto ${this.producto.nombre} se actualizo con exito`,'success')
    })
  }
}
