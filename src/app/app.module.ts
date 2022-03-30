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

const routes: Routes =[

  {path:'',redirectTo:'',pathMatch:'full'},
  {path:'clientes',component:ClientesComponent },
  {path: 'clientes/form', component:FormComponent},
  {path: 'clientes/form/:id', component:FormComponent},
  {path: 'pedidos', component:PedidosComponent}

];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
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

