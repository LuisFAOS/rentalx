import {MigrationInterface, TableForeignKey, Table, QueryRunner} from "typeorm";

export class CreateRentals1639790784200 implements MigrationInterface {

    FKrentals = [
        new TableForeignKey({
           name: "fk_rentals_cars",
           referencedTableName: "cars",
           referencedColumnNames: ["id"],
           columnNames: ["car_id"],
           onDelete: "SET NULL",
           onUpdate: "SET NULL"
        }),
        new TableForeignKey({
           name: "fk_rentals_users",
           referencedTableName: "users",
           referencedColumnNames: ["id"],
           columnNames: ["user_id"],
           onDelete: "SET NULL",
           onUpdate: "SET NULL"
        })
     ]

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.createTable(
            new Table({
                name: "rentals",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "car_id",
                        type: "uuid",
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "start_date",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "end_date",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "expected_return_date",
                        type: "timestamp",
                    },
                    {
                        name: "total",
                        type: "numeric",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ]
            })
        )

        await queryRunner.createForeignKeys("rentals", this.FKrentals)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKeys("rentals", this.FKrentals)
        await queryRunner.dropTable("rentals")
    }

}
