import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo
} from "sequelize-typescript";
import Project from "./Project";

@Table({
    tableName: "Tasks",
    charset: "utf8mb4",
})
export default class Task extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    declare description: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    declare due_date: Date;

    @ForeignKey(() => Project)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare project_id: number;

    @BelongsTo(() => Project)
    declare project: Project;


}
