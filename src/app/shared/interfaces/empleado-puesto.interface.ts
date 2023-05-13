import { Persona } from "./persona.interface";
import { Puesto } from "./puesto.interface";


export interface EmpleadoPuesto {
  id: number,
  puesto: Puesto,
  persona: Persona
}
