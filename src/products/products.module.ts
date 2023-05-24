import { Module } from "@nestjs/common/decorators";
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from "@nestjs/sequelize/dist/sequelize.module";

import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { Product } from "./product.model";
import { jwtConfig } from "src/config/jwt.config";

@Module({
    imports: [SequelizeModule.forFeature([Product]),
    JwtModule.register(jwtConfig)
],
    controllers: [ProductsController],
    providers: [ProductsService],
})

export class ProductsModule {}

export { Product };
