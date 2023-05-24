import { Controller, Post, Body, Get, Param, Patch, Delete, Res } from "@nestjs/common/decorators";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

import { ProductsService } from "./products.service";
import { PassThrough } from "stream";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService,
        private jwtService: JwtService) {}

    @Post()
    async addProduct(
    @Body('title') prodTitle: string, 
    @Body('description') prodDesc: string, 
    @Body('price') prodPrice: number, 
    @Res({passthrough: true}) response: Response)
    {
        const product = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        const jwt =  await this.jwtService.signAsync({id: product.id});
        response.cookie('jwt', jwt, { httpOnly: true })
        return {'message': 'success'};
    }   

    @Get()
    async getAllProduct(){
        const products = await this.productsService.getProducts();
        const result = products.map(({id, title, description, price}) => ({id, title, description, price}));

        return result;
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: number){
        const product = await this.productsService.getOneProduct(prodId);
        const {id, title, price, description, ...result}= product;
        return {id, title, price, description};
    }

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

    @Delete(':id')
    async deleteProduct(@Param('id') prodId: number){
        await this.productsService.removeProduct(prodId);
        return {'message': 'success'};
    }
}
