import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  ingresar(): void {
    const usuario = this.form.value.usuario;
    const contrasena = this.form.value.contrasena;

    if (usuario == 'david' && contrasena == '12345') {
      this.fakeloading();
    } else {
      this.error();
      this.form.reset();
      console.log('error');
    }
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  error() {
    this._snackBar.open('Usuario o Contraseña son invalidos', '', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    });
  }

  fakeloading() {
   this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 400);
    
  }
}
