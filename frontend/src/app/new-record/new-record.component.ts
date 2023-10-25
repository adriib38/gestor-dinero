import { Component } from '@angular/core';
import { RegistrosService } from '../services/registrosService';
import { Register } from '../interfaces/register';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.css'],
})
export class NewRecordComponent {
  concepto: string = '';
  observaciones: string = '';
  categoria: string = '';
  cantidad: number = 0;
  tipoOpciones = ['gasto', 'ingreso'];
  tipo: string = '';

  constructor(
    private registrosService: RegistrosService,
    private router: Router
  ) {}

  async btnCrear() {
    console.log('Btn crear');
    console.log(this.concepto, this.observaciones, this.categoria, this.cantidad, this.tipo);

    if (this.isValidInput()) {
      //Inputs validos
      try {
        let registro: Register;
        registro = {
          id: '0',
          concepto: this.concepto.trim().toLowerCase(),
          observaciones: this.observaciones.trim().toLowerCase(),
          categoria: this.categoria.trim().toLowerCase(),
          cantidad: this.cantidad,
          tipo: this.tipo.toLowerCase(),
          created_at: new Date
        };
        //Crear registro
        let response = this.registrosService.newRegistro(registro);
        if(await response) {
          Swal.fire({
            icon: 'success',
            title: 'Creado correctamente'
          }).then((result) => {
            this.router.navigate(['/registros']);
          })
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      //Inputs invalidos
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Valores no validos'    
      })
    }
  }

  isValidInput(): boolean {
    return this.concepto != '' && 
    this.observaciones != ''  && 
    this.categoria != ''  && 
    this.tipoOpciones.includes(this.tipo) &&
    typeof this.cantidad === 'number' &&
    this.cantidad > 0
  }
}
