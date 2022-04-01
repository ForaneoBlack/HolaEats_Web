import { HttpClientModule } from '@angular/common/http';
import { Directive, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { SharedModule } from './shared/shared.module';



const routes: Routes =[

  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent },
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(x => x.DashboardModule)},
  {path:'**',redirectTo:'login',pathMatch:'full' },
  
  

];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
   SharedModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule
   
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

