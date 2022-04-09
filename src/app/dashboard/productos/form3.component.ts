import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos } from './productos';
import { ProductosService } from './productos.service';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html'
})
export class Form3Component implements OnInit {

  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef | undefined;

  imagen!: File;
  imagenMin!: File;

  public productos: Productos = new (Productos);
  public titulo: String = "Crear Producto"

  constructor(
    private productoService: ProductosService,
    private router: Router, 
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargar();
  }
// ---------Cosas de la Imagen------------
  onUpload(): void{
    this.productoService.upload(this.imagen).subscribe(
      data => {
        this.router.navigate(['./dashboard/productos']);
      },
      err => {
        alert(err.error.mensaje);
        this.reset();
      }
    );
  }
  onFileChange(event: any){
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }
  reset(): void{
    this.imagenFile!.nativeElement.value = '';
  }
// ---------------------
  cargar(): void {
    this.activatedRouter.params.subscribe(
      c => {
        let idProducto = c['idProducto'];
        if (idProducto) {
          this.productoService.get(idProducto).subscribe(
            productos => this.productos = productos
          );
        }
      }
    )
  }

  public create(): void {
    this.productoService.create(this.productos).subscribe(
      productos => {this.router.navigate(['./dashboard/productos'])}
    );
    this.onUpload();
  }
  
  public update():void {
    this.productoService.update(this.productos).subscribe(
      productos => this.router.navigate(['./dashboard/productos'])
    )
  }
  public cancelar(): void{
    this.router.navigate(['./dashboard/productos'])
  }

}
