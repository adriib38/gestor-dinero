import { Injectable } from '@angular/core';
import { Register } from '../interfaces/register';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrosService {
  constructor(private http: HttpClient) {}

  async newRegistro(registro: Register): Promise<boolean> {
    try {
      let apiUrl = 'http://localhost:3000/api/v1';

      // Realizar la petición POST
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          concepto: registro.concepto,
          observaciones: registro.observaciones,
          categoria: registro.categoria,
          tipo: registro.tipo,
          cantidad: registro.cantidad,
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      // Verificar el estado de la respuesta
      if (response.ok) {
        // La petición fue exitosa (código de estado 2xx)
        return true;
      } else {
        // La petición no fue exitosa (código de estado diferente de 2xx)
        console.error(
          `Error en la petición: ${response.status} - ${response.statusText}`
        );
        return false;
      }
    } catch (error) {
      // Manejar errores de red u otros errores durante la petición
      console.error('Error durante la petición:', error);
      return false;
    }
  }

  async deleteRegistro(registroId: string): Promise<boolean> {
    try {
      let apiUrl = 'http://localhost:3000/api/v1';
      const url = `${apiUrl}/${registroId}`;
      await this.http.delete(url).toPromise();
      return true;
    } catch (error) {
      console.error('Error durante la petición:', error);
      return false;
    }
  }

  // Fetch a API para actualizar un registro
  async updateRegistro(
    registroId: string,
    campoContent: String,
    editedContent: String | null
    ): Promise<{ status: boolean; response?: any }> {
    let apiUrl = 'http://localhost:3000/api/v1';
    const url = `${apiUrl}/${registroId}`;
    try {
      let campoContentValue = campoContent.valueOf();
      const bodyContent = JSON.stringify({
        [campoContentValue]: editedContent,
      });

      // Realizar la petición PUT
      const response = await fetch(url, {
        method: 'PUT',
        body: bodyContent,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      // Verificar el estado de la respuesta
      if (response.ok) {
        // La petición fue exitosa (código de estado 2xx)
        return {"status": true, "response": response};
      } else {
        // La petición no fue exitosa (código de estado diferente de 2xx)
        console.error(
          `Error en la petición: ${response.status} - ${response.statusText}`
        );
        return {"status": false, "response": response};
      }
    } catch (error) {
      // Manejar errores de red u otros errores durante la petición
      console.error('Error durante la petición:', error);
      return {"status": false, "response": error};
    }
  }

  getRegistros(): Observable<Register[]> {
    let apiUrl = 'http://localhost:3000/api/v1';

    return this.http
      .get<{ data: Register[] }>(apiUrl)
      .pipe(map((response) => response.data));
  }

  getRegistrosPorCategoria(categoria: string): Observable<Register[]> {
    let apiUrl = 'http://localhost:3000/api/v1/c/supermercado';

    return this.http
      .get<{ data: Register[] }>(apiUrl)
      .pipe(map((response) => response.data));
  }
}
