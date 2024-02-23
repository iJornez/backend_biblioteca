import { join } from 'path';
import { escape } from 'querystring';
import { EstadoUsuario } from 'src/estado_usuario/entities/estado_usuario.entity';
import { Prestamo } from 'src/prestamos/entities/prestamo.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Entity, Column,  OneToMany, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'usuarios', schema: 'public' })
export class Usuarios {
  @PrimaryColumn()
  cedula: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  telefono: number;

  @Column()
  email: string;

  @Column({nullable: false})
  password: string;

  @ManyToOne(() => EstadoUsuario, (estadoUsuario) => estadoUsuario.usuario)
  @JoinColumn()
  estadoDelUsuario: EstadoUsuario[];

  @ManyToOne(() => Role, usuario => usuario.roles)
  @JoinColumn()
  roles: Role;

  @OneToMany(() => Prestamo, prestamo => prestamo.usuario)
  prestamos_usuario: Prestamo[];

}
