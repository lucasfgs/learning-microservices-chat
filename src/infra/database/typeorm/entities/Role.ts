import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PermissionRole } from './PermissionRole'
import { User } from './User'

@Entity('role', { schema: 'public' })
export class Role {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()'
  })
  createdAt: Date;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => PermissionRole, (permissionRole) => permissionRole.role)
  permissionRoles: PermissionRole[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
