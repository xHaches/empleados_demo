import { EmpleadoPuesto } from "../../interfaces/empleado-puesto.interface";

export const personas = [
  {
    id: 1,
    nombre: 'Andrea',
    apellido: 'Abreu',
    fechaNacimiento: new Date('08/01/1999')
  },
  {
    id: 1,
    nombre: 'Liliana',
    apellido: 'Zurita',
    fechaNacimiento: new Date('05/13/1999')
  }
];

export const puestos = [
  {
    id: 1,
    nombre: 'Abogado'
  },
  {
    id: 2,
    nombre: 'Economista'
  }
]

export const empleadosPuestos: EmpleadoPuesto[] = [
  {
    id: 1,
    persona: personas[0],
    puesto: puestos[0]
  },
  {
    id: 2,
    persona: personas[1],
    puesto: puestos[1]
  }
]
