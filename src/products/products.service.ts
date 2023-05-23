import { Injectable, NotFoundException } from "@nestjs/common";

import { Product } from "./product.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product) private productModel: typeof Product) {}

    insertProduct(title: string, description: string, price: number){
        const product = this.productModel.create({title, description, price});
        return product;
    }

    getProducts(){
        return this.productModel.findAll();
    }

    getOneProduct(prodId: number){
        const product = this.findProduct(prodId);
        return product;
    }

    async updateProd(prodId: number, title: string, description: string, price: number){
        const product = this.findProduct(prodId);
        
        if(title){
            (await product).title = title;
        }
        if(description){
            (await product).description = description;
        }
        if(price){
            (await product).price = price;
        }
        (await product).save();
        return product;
    }

    async removeProduct(prodId: number){
        const product = this.findProduct(prodId);
        (await product).destroy();
    }

    private findProduct(prodId: number) {
        const product = this.productModel.findByPk(prodId);
        if(!product){
            throw new NotFoundException("Product Not found");
        }
        return product;
    }
}