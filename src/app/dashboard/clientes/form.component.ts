import { Component, OnInit } from '@angular/core';
import { Cliente } from './clientes';
import { ClienteService } from './cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientesComponent } from './clientes.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  public Cliente: Cliente = new Cliente();
  public titulo: string = 'CREAR CLIENTES';
  public personaId: number = 0;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    public dialogRef: MatDialogRef<ClientesComponent>
  ) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {

    if (this.personaId) {
      this.clienteService.get(this.personaId).subscribe(
        clientes => this.Cliente = clientes
      );
    }

  }
  public create(): void {
    this.clienteService.create(this.Cliente).subscribe(
      cancelar => this.cancelar()
    );

  }

  public update(personaId: number): void {
    this.clienteService.update(this.Cliente,personaId).subscribe(
      cancelar => this.cancelar()
    )
  }

  public cancelar(): void {
    this.dialogRef.close();
  }
}
