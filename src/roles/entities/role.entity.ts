import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @OneToMany(() => Usuarios, prestamo => prestamo.roles)
  roles: Usuarios[];

}
