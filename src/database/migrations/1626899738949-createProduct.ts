import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createProduct1626899738949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider_id',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'UPC',
            type: 'bigint',
          },
          {
            name: 'category',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'float',
          },
          {
            name: 'composition',
            type: 'varchar',
          },
          {
            name: 'amount',
            type: 'integer',
          },
          {
            name: 'size',
            type: 'integer',
          },
          {
            name: 'imagem_one',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'imagem_two',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'imagem_three',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
    await queryRunner.createForeignKey(
      'products',
      new TableForeignKey({
        name: 'foreingkey',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('products', 'foreingkey');
    await queryRunner.dropTable('products');
  }
}
