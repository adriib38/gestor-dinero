import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Register } from '../interfaces/register';
import { RegistrosService } from '../services/registrosService';
import Swal from 'sweetalert2';

import { createChart } from 'lightweight-charts';

@Component({
  selector: 'app-list-registros',
  templateUrl: './list-registros.component.html',
  styleUrls: ['./list-registros.component.css'],
})
export class ListRegistrosComponent implements OnInit {
  @ViewChild('graficosSection', { static: false }) graficosSection!: ElementRef;

  listaRegistros: Register[] = [];
  tipoVista = 2;
  modoEditar = false;
  cargando = true;

  constructor(private registrosService: RegistrosService) {}

  ngOnInit() {
    this.registrosService.getRegistros().subscribe(
      (registros) => {
        this.cargando = false;
        this.listaRegistros = registros;
        console.log(this.listaRegistros);

        this.cargarGraficos(this.listaRegistros);
      },
      (error) => {
        console.error('Error al cargar los registros:', error);
      }
    );
  }

  async eliminarRegistro(id: string) {
    try {
      let response = this.registrosService.deleteRegistro(id);
      if (await response) {
        Swal.fire({
          icon: 'success',
          title: 'Creado correctamente',
        }).then((result) => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  btnCSV() {
    // Crear el contenido del CSV
    const csvContent = this.convertirAFormatoCSV(this.listaRegistros);

    // Crear un blob (Binary Large Object) para el contenido CSV
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Crear un enlace temporal y descargar el archivo CSV
    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);

    let date = new Date();
    let nombreArchivo =
      'registros-' +
      date.getDay() +
      date.getMonth() +
      date.getFullYear() +
      '.csv';
    link.setAttribute('href', url);
    link.setAttribute('download', nombreArchivo);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  //Switch entre vista tabla y cards
  cambiarVista() {
    this.tipoVista = this.tipoVista === 1 ? 2 : 1;
  }

  //Switch modo edicion
  cambiarModoEditar() {
    if (this.modoEditar) {
      this.modoEditar = false;
    } else {
      this.modoEditar = true;

      //Guardar cambios de registros
      const paragraphs = document.getElementsByClassName('campo-registro');
      console.log(paragraphs);

      Array.prototype.slice.call(paragraphs).forEach((paragraph: Element) => {
        let elementoPadre = paragraph.parentNode as HTMLElement;
        let nombreCampoEditado = elementoPadre.className.split('-')[1];
        let idRegistro = (elementoPadre.parentNode as HTMLElement).id;
        let valorViejo = paragraph.textContent;

        paragraph.addEventListener('blur', (event) =>
          this.handleParagraphBlur(
            event,
            nombreCampoEditado,
            idRegistro,
            paragraph,
            valorViejo
          )
        );
      });
    }
  }

  //Despues de quitar el foco en un campo de un registro
  async handleParagraphBlur(
    event: Event,
    nombreCampoEditado: string,
    idRegistro: string,
    paragraph: Element,
    valorViejo: any
  ) {
    const valorNuevo = paragraph.textContent;

    if (valorNuevo == valorViejo) {
      return;
    }

    if (valorNuevo == '') {
      paragraph.textContent = valorViejo;
      return;
    }

    const editedParagraph = event.target as HTMLElement;
    const editedContent = editedParagraph.textContent;

    //Peticion al servicio para editar
    let response = await this.registrosService.updateRegistro(
      idRegistro,
      nombreCampoEditado,
      editedContent
    );

    if (response.status) {
      console.log(response.response);
      Swal.fire({
        position: 'bottom-end',
        icon: 'success',
        title: 'Actualizado correctamente',
        text: response.response.status,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      console.log(response.response.statusText);
      Swal.fire({
        position: 'bottom-end',
        icon: 'error',
        title: 'Error al actualizar',
        text: response.response.statusText,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  convertirAFormatoCSV(registros: Register[]): string {
    const headers = Object.keys(registros[0]).join(';');
    const filas = registros.map((registro) =>
      Object.values(registro).join(',')
    );
    return headers + '\n' + filas.join('\n');
  }

  formatDate(date: Date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  filtrarPorTipo(Registros: Register[], tipo: string) {
    let response = [];
    for (let i = 0; i < Registros.length; i++) {
      let r = Registros[i];
      if (r.tipo == tipo) {
        response.push(r);
      }
    }
    return response;
  }

  //Cargar registros en graficos
  cargarGraficos(registrosGastos: Register[]) {
    this.gastos(this.filtrarPorTipo(registrosGastos, 'gasto'));
    this.ingresos(this.filtrarPorTipo(registrosGastos, 'ingreso'));
    this.balance(registrosGastos);

  }

  private gastos(gastos: Register[]) {
    this.setupChart(gastos, '#C60842');
  }

  private ingresos(ingresos: Register[]) {
    this.setupChart(ingresos, '#00A86B');
  }

  private balance(balance: Register[]) {
    this.setupChart(balance, '#FFC107');
  }

  private setupChart(data: Register[], color: string) {
    const chart = createChart(this.graficosSection.nativeElement, {
      width: 700,
      height: 500,
      layout: {
        textColor: '#d1d4dc',
        background: { color: '#131722' },
      },
    });

    const areaSeries = chart.addAreaSeries({
      topColor: color,
      bottomColor: 'rgba(38, 198, 218, 0.04)',
      lineColor: color,
      lineWidth: 2,
    });

    const dataset = data.map((item) => ({
      time: this.formatDate(new Date(item.created_at)).toString(),
      value: item.cantidad,
    }));

    areaSeries.setData(dataset);
  }


  
}
