import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';
import { DashboardComponent } from './dashboard.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { Form2Component } from './empleados/form2.component';
import { HeaderComponent } from './header/header.component';
import { InicioComponent } from './inicio/inicio.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { Form3Component } from './productos/form3.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'inicio', component: InicioComponent },
      { path: 'header', component: HeaderComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'productos', component: ProductosComponent },
      { path: 'productos/:idProducto', component: ProductosComponent },
      { path: 'productos/form3', component: Form3Component },
      { path: 'productos/form3/:idProducto', component: Form3Component },
      { path: 'clientes', component: ClientesComponent },
      { path: 'clientes/form', component: FormComponent },
      {path: 'clientes/form/:personaId', component:FormComponent},
      { path: 'empleados', component: EmpleadosComponent },
      { path: 'empleados/form2', component: Form2Component },
      { path: 'empleados/form2/:personaId', component: Form2Component },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
