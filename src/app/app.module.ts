import { HttpClientModule } from '@angular/common/http';
import { Directive, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';
import { PedidosService } from './dashboard/pedidos/pedidos.service';
import { FormComponent } from './dashboard/clientes/form.component';
import { Form2Component } from './dashboard/empleados/form2.component';
import { Form3Component } from './dashboard/productos/form3.component';
import { PedidosFormComponent } from './dashboard/pedidos/pedidos-form.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { GaleriaComponent } from './dashboard/galeria/galeria.component';
import { SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG } from 'ngx-swiper-wrapper';
  



const routes: Routes =[

  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent },
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(x => x.DashboardModule)},
  {path:'**',redirectTo:'login',pathMatch:'full' },
  
  

];

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormComponent,
    Form2Component,
    Form3Component,
    PedidosFormComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
   SharedModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    NgbModalModule
  ],

  providers: [PedidosService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

