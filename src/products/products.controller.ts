import { Controller, Post, Body, Get, Param, Patch, Delete, Res } from "@nestjs/common/decorators";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    //Service Injection
    constructor(private readonly productsService: ProductsService,
        private jwtService: JwtService) {}

    //Post request to save the data
    @Post()
    async addProduct(
    @Body('title') prodTitle: string, 
    @Body('description') prodDesc: string, 
    @Body('price') prodPrice: number, 
    @Res({passthrough: true}) response: Response)
    {
        const product = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        const jwt =  await this.jwtService.signAsync({id: product.id});     //JWT token added with payload as id
        response.cookie('jwt', jwt, { httpOnly: true })
        return {'message': 'success'};
    }   

    //GET request to fetch all the products 
    @Get()
    async getAllProduct(){
        const products = await this.productsService.getProducts();
        const result = products.map(({id, title, description, price}) => ({id, title, description, price}));

        return result;
    }

    //GET request to fetch single product
    @Get(':id')
    async getProduct(@Param('id') prodId: number){
        const product = await this.productsService.getOneProduct(prodId);
        const {id, title, price, description, ...result}= product;
        return {id, title, price, description};
    }

    //PATCH request to update the data in product, the data which can be updated is title, description and price
    @Patch(':id')
    async updateProduct(
    @Param('id') prodId: number, 
    @Body('title') prodTitle: string, 
    @Body('description') prodDesc: string, 
    @Body('price') prodPrice: number,
    @Res({passthrough: true}) response: Response)
    {
        const product = await this.productsService.updateProd(prodId, prodTitle, prodDesc, prodPrice);
        const jwt = await this.jwtService.signAsync({id: product.id});
        response.cookie('jwt', jwt, { httpOnly: true })
        return {'message': 'success'};
    }

    //DELETE request to delete the product
    @Delete(':id')
    async deleteProduct(@Param('id') prodId: number){
        await this.productsService.removeProduct(prodId);
        return {'message': 'success'};
    }
}
