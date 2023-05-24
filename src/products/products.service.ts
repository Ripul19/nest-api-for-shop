import { Injectable, NotFoundException } from "@nestjs/common";

import { Product } from "./product.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class ProductsService {

    //Model Injection
    constructor(@InjectModel(Product) private productModel: typeof Product) {}

    //Post request mapping, to create a new product
    //create is a function provide by sequelize 
    async insertProduct(title: string, description: string, price: number){
        const product = await this.productModel.create({title, description, price});
        return product;
    }  

    //Get Products to fetch all the products
    //findAll is the function provide by sequelize
    getProducts(){
        return this.productModel.findAll();
    }

    //get one product
    async getOneProduct(prodId: number){
        const product = await this.findProduct(prodId); //common findproduct method is created to fetch the product from db
        return product;
    }

    //update product 
    async updateProd(prodId: number, title: string, description: string, price: number){
        const product = await this.findProduct(prodId); //common findproduct method
        
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

    //delete product
    async removeProduct(prodId: number){
        const product = await this.findProduct(prodId);
        product.destroy();
    }

    //findProduct function
    private async findProduct(prodId: number) {
        const product = await this.productModel.findByPk(prodId); //findByPk is method provide by sequelize
        if(!product){
            throw new NotFoundException("Product Not found");
        }
        return product;
    }
}