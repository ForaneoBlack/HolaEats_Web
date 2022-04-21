import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientesComponent } from './clientes/clientes.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ProductosComponent } from './productos/productos.component';
import { InicioComponent } from './inicio/inicio.component';
import { Form3Component } from './productos/form3.component';
import { GaleriaComponent } from './galeria/galeria.component';

import { ImagenComponent } from './productos/imagen.component';
import { SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG } from 'ngx-swiper-wrapper';



@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    EmpleadosComponent,
    PedidosComponent,
    ProductosComponent,
    InicioComponent,
    ImagenComponent,
    GaleriaComponent
  
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    SwiperModule
  ]
})
export class DashboardModule { }
