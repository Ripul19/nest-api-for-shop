import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.model';

@Module({
  imports: [ProductsModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Khurana1222@',
      database: 'nest-api',
      models: [Product],
      autoLoadModels: true,
      synchronize: true,
    })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
