import {
  Column,
  OneToOne,
  Entity,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  TableInheritance,
  ChildEntity
} from 'typeorm';

import { ApartmentEntity } from './apartment.entity';
import { UserRole } from '../../common/enums';

@Entity()
@TableInheritance({ column: { type: 'enum', enum: UserRole, name: 'role' } })
export abstract class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Column({ type: 'enum', enum: UserRole })
  public role!: UserRole;

  @Column()
  public email!: string;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column()
  public password!: string;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}

@ChildEntity(UserRole.client)
export class ClientEntity extends UserEntity {
  @Column({ nullable: true })
  public apartmentId?: string;

  @OneToOne(() => ApartmentEntity, apartment => apartment.client)
  public apartment?: ApartmentEntity;
}

@ChildEntity(UserRole.realtor)
export class RealtorEntity extends UserEntity {
  @Column('varchar', { array: true, default: [] })
  public apartmentIds!: string[];

  @OneToMany(() => ApartmentEntity, apartment => apartment.realtor, {
    cascade: true
  })
  public apartments!: ApartmentEntity[];
}

@ChildEntity(UserRole.admin)
export class AdminEntity extends UserEntity {}
