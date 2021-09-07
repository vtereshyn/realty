import {
  Column,
  Entity,
  OneToOne,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Location } from '../../common/graphql';
import { RentStatus, RoomsCount } from '../../common/enums';

import { ClientEntity, RealtorEntity } from './user.entity';

@Entity()
export class ApartmentEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

  @Column()
  public name!: string;

  @Column({ type: 'text' })
  public description!: string;

  @Column({ type: 'enum', enum: RentStatus })
  public status!: RentStatus;

  @Column()
  public size!: number;

  @Column()
  public price!: number;

  @Column({ type: 'enum', enum: RoomsCount })
  public roomsCount!: RoomsCount;

  @Column('varchar', { array: true, default: [] })
  public pictures!: string[];

  @Column({ type: 'jsonb' })
  public location!: Location;

  @Column()
  public realtorId!: string;

  @ManyToOne(() => RealtorEntity, realtor => realtor.apartments)
  public realtor!: RealtorEntity;

  @Column({ nullable: true })
  public clientId?: string;

  @OneToOne(() => ClientEntity, client => client.apartment, { nullable: true })
  public client?: ClientEntity;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
