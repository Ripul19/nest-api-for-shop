import { Module } from "@nestjs/common/decorators";

import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { Product } from "./product.model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
    imports: [SequelizeModule.forFeature([Product])],
    controllers: [ProductsController],
    providers: [ProductsService]
})

export class ProductsModule {}