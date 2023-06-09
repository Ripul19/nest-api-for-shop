import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './config/database.module';

//databse module and product module is added
@Module({
  imports: [ProductsModule,
    DatabaseModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
