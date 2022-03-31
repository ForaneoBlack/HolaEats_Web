import { HttpClientModule } from '@angular/common/http';
import { Directive, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ClienteService } from './clientes/cliente.service';
import { ClientesComponent } from './clientes/clientes.component';
import { Form1Component } from './clientes/form1.component';
import { EmpleadoService } from './empleados/empleado.service';
import { EmpleadosComponent } from './empleados/empleados.component';
import { Form2Component } from './empleados/form2.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidosService } from './pedidos/pedidos.service';
import { Form3Component } from './productos/form3.component';
import { ProductoService } from './productos/producto.service';
import { ProductosComponent } from './productos/productos.component';


const routes: Routes =[

  {path:'',redirectTo:'',pathMatch:'full'},
  {path:'clientes',component:ClientesComponent },
  {path: 'clientes/form', component:Form1Component},
  {path: 'clientes/form/:personaId', component:Form1Component},

  {path: 'pedidos', component:PedidosComponent},

  {path: 'empleados',component:EmpleadosComponent},
  {path: 'empleados/form2', component:Form2Component},

  {path: 'pedidos', component:PedidosComponent},
  {path: 'productos', component:ProductosComponent}

];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    PedidosComponent,
    Form1Component,
    EmpleadosComponent,
    Form2Component,
    PedidosComponent,
    ProductosComponent,
    Form3Component
    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],

  providers: [ClienteService,PedidosService,ProductoService,EmpleadoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

