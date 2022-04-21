import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Productos } from './productos';
import { ProductosService } from './productos.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductosComponent } from './productos.component';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html',
})
export class Form3Component implements OnInit {
  @ViewChild('imagenInputFile', { static: false }) imagenFile:
    | ElementRef
    | undefined;

  imagen!: File;
  imagenMin!: File;

  public productos: Productos = new Productos();
  public titulo: String = 'Crear Producto';
  public idProducto: number = 0;
  public id: number = 0;

  form;
  constructor(
    private productoService: ProductosService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    public dialogRef: MatDialogRef<ProductosComponent>,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      nombre: ['',Validators.required],
      categoria: ['',Validators.required],
      descripcion: ['',Validators.required],
      precio: ['',Validators.required],
      stock: ['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.cargar();
  }
  // ---------Cosas de la Imagen------------
  onUpload(): void {
    this.productoService.upload(this.imagen).subscribe(
      (data) => {
        //aqui deberia ir la Url de la imagen subida
        //se debe almacenar en algun lado
        this.router.navigate(['./dashboard/productos']);
      },
      (err) => {
        alert(err.error.mensaje);
        this.reset();
      }
    );
  }
  onFileChange(event: any) {
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }
  reset(): void {
    this.imagenFile!.nativeElement.value = '';
  }
  // ---------------------
  cargar(): void {
    if (this.idProducto) {
      this.productoService.get(this.idProducto).subscribe(
        productos => this.productos = productos
      );
    }
  }

  public create(): void {
//aqui deberia ir this.uppload y almacena
//this.productos.urlimagen y aqui deberia almacenar la foto
//luego se llama al producto service
    if (this.form.valid) {
      this.productoService
        .create(this.productos)
        .subscribe(cancelar => this.cancelar()
        );
      this.onUpload();
      Swal.fire('Producto guardado', `El producto ${this.productos.nombre} se a creado con éxito`, 'success')
    } else {
      alert('Revise que los campos esten llenados correctamente')
    }
  }

  public update(idProducto: number): void {
    this.productoService
      .update(this.productos, idProducto)
      .subscribe(cancelar => this.cancelar());      
  }
  public cancelar(): void {
    this.dialogRef.close();
  }
}
