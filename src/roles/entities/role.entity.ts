import { Usuarios } from 'src/usuarios/entities/usuarios.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  descripcion: string;

  @OneToMany(() => Usuarios, prestamo => prestamo.rol)
  roles: Usuarios[];

}
