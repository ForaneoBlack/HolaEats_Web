import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
import Swal from 'sweetalert2';

;
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
})
export class ProductosComponent implements OnInit {

  productos:Producto[]=[];
  constructor(private productoService:ProductoService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(productos=>this.productos=productos)
  }

  eliminarProducto(productos:Producto): void{
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.deleteProducto(productos.id_producto).subscribe(
          res=>this.productoService.getProductos().subscribe(
            response=>{this.productos=response
            }
          )
        )
        
        Swal.fire(
         'Cliente Eliminaddo'
          ,`El cliente ${productos.nombre} ha sido eliminado`,'success'
        )
      }
    })
    
   
  }

}
