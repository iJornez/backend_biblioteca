import { Estadoequipo } from "src/estadoequipo/entities/estadoequipo.entity";
import { TiposEquipos } from "src/tipos-equipos/entities/tipos-equipos.entity";

export class CreateEquipoDto {
  codigo: number;
  serial: string;
  telefonica: string; 
  descripcion: string;
  estado: Estadoequipo;
  tipo: TiposEquipos[];
}
