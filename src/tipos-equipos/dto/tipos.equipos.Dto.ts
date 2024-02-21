import { Equipo } from "src/equipos/entities/equipo.entity";

export class TiposEquiposDto {
  id: number;
  tipo:string;
  equipo_tipo: Equipo[];
}
