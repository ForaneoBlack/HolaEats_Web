import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SwiperOptions } from 'swiper';
import { Imagen } from './imagen';
import { ProductosService } from './productos.service';

@Component({
  selector: 'app-imagen',
  templateUrl: './imagen.component.html'
})
export class ImagenComponent implements OnInit {

  @Input() index: any;
  imagenes: Imagen[] = [];

  public config: SwiperOptions = {
    a11y: { enabled: true },
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  constructor(
    private activeModal: NgbActiveModal,
    private productoService: ProductosService
  ) { }

  ngOnInit(): void {
    this.config.initialSlide = this.index;
    this.productoService.list().subscribe(
      data => {
        this.imagenes = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  cerrar(){
    this.activeModal.dismiss();
  }

}
