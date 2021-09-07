import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { ApartmentEntity } from '../entities';
import { RentStatus, RoomsCount } from '../../common/enums';

export class ApartmentCreate1627632302042 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const { tableName } = queryRunner.connection.getMetadata(ApartmentEntity);

    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'text'
          },
          {
            name: 'status',
            type: 'enum',
            enum: [RentStatus.available, RentStatus.rented],
            default: `'${RentStatus.available}'::${tableName}_status_enum`
          },
          {
            name: 'size',
            type: 'int'
          },
          {
            name: 'price',
            type: 'int'
          },
          {
            name: 'roomsCount',
            type: 'enum',
            enum: [
              RoomsCount.Room_1,
              RoomsCount.Rooms_2,
              RoomsCount.Rooms_3,
              RoomsCount.Rooms_4,
              RoomsCount.Rooms_5Plus
            ]
          },
          {
            name: 'location',
            type: 'jsonb'
          },
          {
            name: 'realtorId',
            type: 'uuid'
          },
          {
            name: 'clientId',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'NOW()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'NOW()'
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const { tableName } = queryRunner.connection.getMetadata(ApartmentEntity);
    return queryRunner.dropTable(tableName);
  }
}
