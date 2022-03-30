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
<<<<<<< Updated upstream
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidosService } from './pedidos/pedidos.service';
=======
<<<<<<< HEAD
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpleadoService } from './empleados/empleado.service';
import { Form2Component } from './empleados/form2.component';


=======
import { PedidosComponent } from './pedidos/pedidos.component';
import { PedidosService } from './pedidos/pedidos.service';
>>>>>>> 4508e264f82f165464898a470ecddc94ca9aab76
>>>>>>> Stashed changes

const routes: Routes =[

  {path:'',redirectTo:'',pathMatch:'full'},
  {path:'clientes',component:ClientesComponent },
  {path: 'clientes/form', component:FormComponent},
  {path: 'clientes/form/:id', component:FormComponent},
<<<<<<< Updated upstream
  {path: 'pedidos', component:PedidosComponent}
=======
<<<<<<< HEAD
  {path: 'empleados',component:EmpleadosComponent},
  {path: 'empleados/form2', component:Form2Component}
=======
  {path: 'pedidos', component:PedidosComponent}
>>>>>>> 4508e264f82f165464898a470ecddc94ca9aab76
>>>>>>> Stashed changes

];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
<<<<<<< Updated upstream
    PedidosComponent,
    FormComponent
    
=======
<<<<<<< HEAD
    FormComponent,
    EmpleadosComponent,
    Form2Component
=======
    PedidosComponent,
    FormComponent
    
>>>>>>> 4508e264f82f165464898a470ecddc94ca9aab76
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
<<<<<<< Updated upstream
  providers: [ClienteService,PedidosService],
=======
<<<<<<< HEAD
  providers: [ClienteService,EmpleadoService],
=======
  providers: [ClienteService,PedidosService],
>>>>>>> 4508e264f82f165464898a470ecddc94ca9aab76
>>>>>>> Stashed changes
  bootstrap: [AppComponent]
})
export class AppModule { }

