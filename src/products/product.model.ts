// export class Product {

//     constructor(public id: string, public title: string, public description: string, public price: number){

//     }
// }

import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table
export class Product extends Model {
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