import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common/decorators";

import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    addProduct(@Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number) {
        const product = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return product;
    }   

    @Get()
    getAllProduct(){
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: number){
        return this.productsService.getOneProduct(prodId);
    }

    @Patch(':id')
    updateProduct(@Param('id') prodId: number, @Body('title') prodTitle: string, @Body('description') prodDesc: string, @Body('price') prodPrice: number){
        return this.productsService.updateProd(prodId, prodTitle, prodDesc, prodPrice);
    }

    @Delete(':id')
    deleteProduct(@Param('id') prodId: number){
        this.productsService.removeProduct(prodId);
        return null;
    }
}
