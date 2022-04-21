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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Form3Component } from './form3.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  displayedColumns: string[] = [
    'idProducto',
    'nombre',
    'categoria',
    'descripcion',
    'precio',
    'stock',
    'acciones',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;

  imagenes: Imagen[] = [];
  productos: Productos[] = [];

  constructor(
    private ProductoService: ProductosService,
    public dialog: MatDialog,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarImagenes();
  }
  // ----------Imagenes--------
  cargarImagenes(): void {
    this.ProductoService.list().subscribe((data) => {
      this.imagenes = data;
    });
  }
  deleteImagen(id: number): void {
    this.ProductoService.deleteImg(id).subscribe(
      (data) => {
        this.cargarImagenes();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  abrirModal(i: number): void {
    const modalRef = this.modalService.open(ImagenComponent);
    modalRef.componentInstance.index = i;
  }
  // ----------------
  cargarProductos() {
    this.ProductoService.getProductos().subscribe((productos) => {
      this.productos = productos;
      this.dataSource = new MatTableDataSource(this.productos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  delete(idProducto: number) {
    this.ProductoService.delete(idProducto).subscribe(
      res => this.ProductoService.getProductos().subscribe(
        response => this.cargarProductos()
      )
    );
    this.deleteImagen(idProducto);
    Swal.fire({
      title: 'Estas seguro de eliminar el producto?',
      text: "No se podra revertir despues!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, deseo eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Producto eliminado', `El producto se a eliminado con éxito`,'error'
        )
      }
    })
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  openDialog(idProducto: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(Form3Component, dialogConfig);

    dialogRef.componentInstance.idProducto = idProducto;
    dialogRef.afterClosed().subscribe((result) => {
      this.cargarProductos();
    });
  }
}
