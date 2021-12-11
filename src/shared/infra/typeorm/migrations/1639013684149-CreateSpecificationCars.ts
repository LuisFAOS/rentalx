import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSpecificationCars1639013684149 implements MigrationInterface {


   FKSpecificationsCars = [
      new TableForeignKey({
         name: "fk_specificationsCars_car",
         referencedTableName: "cars",
         referencedColumnNames: ["id"],
         columnNames: ["car_id"],
         onDelete: "SET NULL",
         onUpdate: "SET NULL"
      }),
      new TableForeignKey({
         name: "fk_specificationsCars_specification",
         referencedTableName: "specifications",
         referencedColumnNames: ["id"],
         columnNames: ["specification_id"],
         onDelete: "SET NULL",
         onUpdate: "SET NULL"
      })
   ]

   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
         new Table({
            name: "specifications_cars",
            columns: [
               {
                  name: "car_id",
                  type: "uuid"
               },
               {
                  name: "specification_id",
                  type: "uuid"
               },
               {
                  name: "created_at",
                  type: "timestamp",
                  default: "now()"
               }
            ]
         })
      )

      await queryRunner.createForeignKeys(
         "specifications_cars",
         this.FKSpecificationsCars
      )

   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKeys("specifications_cars", this.FKSpecificationsCars);
      await queryRunner.dropTable("specifications_cars")
   }

}
