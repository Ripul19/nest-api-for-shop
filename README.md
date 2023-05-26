
# Ajargh Kreation Solutions Backend Assignment
 
## Description
 
This repo contains a RESTful API built with NestJS that demonstrates CRUD (Create, Read, Update, Delete) functionality. The API is built on top of a Relational Database Management System (RDBMS) to store the data. Additionally, the API includes JWT (JSON Web Token) authentication wherever necessary.
 
## Steps for Running APIs
 
1. Clone the repo to your system.
 
2. **Setup your database locally** and put its credentials and database name and other info which need to change in `database.module.ts` file in the `src/config` folder.
 
   ( Add your host, port number, username, password in the given code below in `database.module.ts` file )
   ```typescript
   import { Module } from '@nestjs/common';
   import { SequelizeModule } from '@nestjs/sequelize';
   import { Product } from 'src/products/product.model';
 
   @Module({
     imports: [
       SequelizeModule.forRoot({
         dialect: 'mysql',
         host: 'YOUR_HOST',
         port: PORT_NUMBER,
         username: 'YOUR_USERNAME',
         password: 'YOUR_PASSWORD',
         database: 'nest-api',
         models: [Product],
         autoLoadModels: true,
         synchronize: true,
       }),
     ],
   })
   export class DatabaseModule {}
   ```
 
4. Project is ready to run
 
5. Database handling is done through Sequelize, no need to change the queries
 
 
 
6. Run below command 
```
npm run start:dev
```
 
 
 
### POST Request
 
* Go to Postman and send a post request to the link localhost:3000/products
 
Request Body: {"title": "", "description": "", "price": ""}
 
### GET Request
 
 * now, send a Get request to the same link and you can get the product added to terminal
 
 
 
* Similarly you can add more products through POST request
 
 
 
### GET Request
 
* To fetch single product, send a get request to localhost:3000/products/:id,
 
where :id will be replaced by the id of the product you want to fetch
 
 
 
### PATCH Request
 
* Update operation can be performed by sending a Patch request to localhost:3000/products/:id,
 
where :id will be replaced by the id of the product you want to fetch
 
__Request Body: {"title": "", "description": "", "price": ""}__
 
You can send only one or two fields also, no need to send all the three fields
 
 
 
### DELETE Request
 
* Delete operation can be performed by sending a delete request to localhost:3000/products/:id,
 
where :id will be replaced by the id of the product you want to fetch
 
 ### Postman Export Link
 https://github.com/Ripul19/nest-api-for-shop/blob/develop/nest-api.postman_collection.json
 
 
 
## Imporvements
 
- [ ] Env file needs to set up
 
- [ ] JWT token can be added to env file
 
- [ ] Docker containerization
