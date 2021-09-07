import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { UserRole } from '../../common/enums';
import { UserEntity } from '../entities';

export class UserCreate1627569969300 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const { tableName } = queryRunner.connection.getMetadata(UserEntity);

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
            name: 'role',
            type: 'enum',
            enum: [UserRole.admin, UserRole.client, UserRole.realtor]
          },
          {
            name: 'email',
            type: 'varchar'
          },
          {
            name: 'firstName',
            type: 'varchar'
          },
          {
            name: 'lastName',
            type: 'varchar'
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'apartmentId',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'apartmentIds',
            type: 'varchar',
            isArray: true,
            default: `'{}'`
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
    const { tableName } = queryRunner.connection.getMetadata(UserEntity);
    return queryRunner.dropTable(tableName);
  }
}
