import { Injectable, NotFoundException } from "@nestjs/common";

import { Product } from "./product.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product) private productModel: typeof Product) {}

    async insertProduct(title: string, description: string, price: number){
        const product = await this.productModel.create({title, description, price});
        return product;
    }

    getProducts(){
        return this.productModel.findAll();
    }

    async getOneProduct(prodId: number){
        const product = await this.findProduct(prodId);
        return product;
    }

    async updateProd(prodId: number, title: string, description: string, price: number){
        const product = await this.findProduct(prodId);
        
        if(title){
            product.title = title;
        }
        if(description){
            product.description = description;
        }
        if(price){
            product.price = price;
        }
        product.save();
        return product;
    }

    async removeProduct(prodId: number){
        const product = await this.findProduct(prodId);
        product.destroy();
    }

    private async findProduct(prodId: number) {
        const product = await this.productModel.findByPk(prodId);
        if(!product){
            throw new NotFoundException("Product Not found");
        }
        return product;
    }
}