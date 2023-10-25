import { Register } from '../interfaces/register';

export const REGISTROS: Register[] = [
  {
    concepto: 'Compra de comestibles',
    observaciones: 'AAA',
    tipo: 'gasto',
    cantidad: 45.99,
    created_at: new Date('2023-09-23'),
  },
  {
    concepto: 'Ingreso por salario',
    tipo: 'ingreso',
    observaciones: 'AAA',
    cantidad: 1500.0,
    created_at: new Date('2023-09-24'),
  },
  {
    concepto: 'Pago de factura de electricidad',
    tipo: 'gasto',
    observaciones: 'AAA',
    cantidad: 60.5,
    created_at: new Date('2023-09-25'),
  },
  {
    concepto: 'Ingreso por alquiler',
    tipo: 'ingreso',
    observaciones: 'AAA',
    cantidad: 700.0,
    created_at: new Date('2023-09-26'),
  },
];
