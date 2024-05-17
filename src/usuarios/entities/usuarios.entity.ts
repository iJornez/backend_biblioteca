import { Prestamo } from 'src/prestamos/entities/prestamo.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Entity, Column, OneToMany, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Usuarios {
  @PrimaryColumn()
  cedula: number;

  @Column({ type: 'varchar', length:80 })
  nombre: string;

  @Column({ type: 'varchar', length:80 })
  apellido: string;

  @Column({ type: 'varchar', length:15 })
  telefono: string;

  @Column({ type: 'varchar', unique: true, length:50 })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 256 })
  password: string;

  @Column({ type: 'varchar', default: 'Activo', nullable:false})
  estadoDelUsuario: string;

  @ManyToOne(() => Role, usuario => usuario.roles, {
    eager: true
  })
  rol: Role;

  @OneToMany(() => Prestamo, prestamo => prestamo.usuario)
  prestamos_usuario: Prestamo[];

  @Column({ type: 'varchar', default: null, nullable: true })
  token_recuperacion: string;

}
