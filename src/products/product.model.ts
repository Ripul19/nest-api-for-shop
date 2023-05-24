import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";


//Model or entity
@Table
export class Product extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column 
    title: string;

    @Column
    description: string;

    @Column
    price: number;

    @Column(DataType.DATE)
    createdAt: Date;

    @Column(DataType.DATE)
    updatedAt: Date;
}