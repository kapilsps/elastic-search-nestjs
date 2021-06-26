import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchServiceInterface } from '../elastic-search/interface/search.service.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductSearchObject } from './object/product.search.object';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
        @Inject('SearchServiceInterface') private readonly searchService: SearchServiceInterface<any>
    ){}

    async create(createProductDto: CreateProductDto): Promise<Product>{
        const createProduct = new this.productModel(createProductDto);
        return createProduct.save();
    }

    async findAll(): Promise<Product[]>{
       return await this.productModel.find();
    }

    async update(id: string, updateProductDto: CreateProductDto): Promise<any> {
        return await this.productModel.findByIdAndUpdate(id, updateProductDto, {
            new: true
        });
    }

    public async search(q: any): Promise<any> {
        const data = ProductSearchObject.searchObject(q);
        const result = (await this.searchService.searchIndex(data)).body.hits.hits;
        return result.map(x => x._source);
    }
}
