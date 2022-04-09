import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Imagen } from './imagen';
import { ImagenComponent } from './imagen.component';
import { Productos } from './productos';
import { ProductosService } from './productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  displayedColumns: string[] = ['idProducto', 'nombre', 'categoria', 'descripcion', 'precio', 'stock','acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource! : MatTableDataSource<any>;

  imagenes: Imagen[] = [];
  productos : Productos[] = [];

  constructor(private ProductoService: ProductosService,
    private router: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarImagenes();
  }
// ----------Imagenes--------
  cargarImagenes(): void{
    this.ProductoService.list().subscribe(
      data => {
        this.imagenes = data;
      }
    );
  }
  deleteImagen(id: number): void{
    this.ProductoService.deleteImg(id).subscribe(
      data => {
        this.ProductoService.getProductos().subscribe(
          response=>this.productos=response
        )
      },
      err => {
        console.log(err);
      }
    )
  }
  abrirModal(): void{
    this.modalService.open(ImagenComponent);
  }
  // ----------------
  cargarProductos(){
    this.ProductoService.getProductos().subscribe(
      productos => this.productos = productos)
      this.dataSource = new MatTableDataSource(this.productos);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(producto : Productos):void{
    this.ProductoService.delete(producto.idProducto).subscribe(
      res=>this.ProductoService.getProductos().subscribe(
        response=>this.productos=response
      )
    );
    this.deleteImagen(producto.idProducto);
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  eliminarProducto(index: number){

  }
}