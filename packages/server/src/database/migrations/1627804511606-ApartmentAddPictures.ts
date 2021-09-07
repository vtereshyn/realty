import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { ApartmentEntity } from '../entities';

const picturesColumnName = 'pictures';

export class ApartmentAddPictures1627804511606 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const { tableName } = queryRunner.connection.getMetadata(ApartmentEntity);

    return queryRunner.addColumn(
      tableName,
      new TableColumn({
        name: picturesColumnName,
        type: 'varchar',
        isArray: true,
        default: `'{}'`
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const { tableName } = queryRunner.connection.getMetadata(ApartmentEntity);
    return queryRunner.dropColumn(tableName, picturesColumnName);
  }
}
