import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty } from "class-validator";
import { rolesDto } from "./roles.dto";


export class UpdateRolDto extends PartialType(rolesDto) {

  @IsNotEmpty()
  id: number;

  descripcion: string;

}