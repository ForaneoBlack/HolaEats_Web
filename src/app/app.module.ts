import { Directive, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './clientes/form.component';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule} from '@angular/forms';


import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidosService } from './pedidos/pedidos.service';


import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpleadoService } from './empleados/empleado.service';
import { Form2Component } from './empleados/form2.component';


const routes: Routes =[

  {path:'',redirectTo:'',pathMatch:'full'},
  {path:'clientes',component:ClientesComponent },
  {path: 'clientes/form', component:FormComponent},
  {path: 'clientes/form/:personaId', component:FormComponent},

  {path: 'pedidos', component:PedidosComponent},

  {path: 'empleados',component:EmpleadosComponent},
  {path: 'empleados/form2', component:Form2Component},

  {path: 'pedidos', component:PedidosComponent}


];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    PedidosComponent,
    FormComponent,
    FormComponent,
    EmpleadosComponent,
    Form2Component,

    PedidosComponent,
    FormComponent
    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],

  providers: [ClienteService,PedidosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

