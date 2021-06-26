import { Inject, Injectable } from '@nestjs/common';
import { SearchServiceInterface } from '../interface/search.service.interface';
import { productIndex } from '../constant/product.elastic';
import { Product } from '../../product/schemas/product.schema';

@Injectable()
export class ProductElasticIndex {
  constructor(
    @Inject('SearchServiceInterface')
    private readonly searchService: SearchServiceInterface<any>,
  ) {}

  public async insertProductDocument(product: Product): Promise<any> {
    const data = this.productDocument(product);
    return await this.searchService.insertIndex(data);
  }

  public async updateProductDocument(product: any): Promise<any> {
    const data = this.productDocument(product);
    await this.deleteProductDocument(product.id);
    return await this.searchService.insertIndex(data);
  }

  private async deleteProductDocument(prodId: number): Promise<any> {
    const data = {
      index: productIndex._index,
      type: productIndex._type,
      id: prodId.toString(),
    };
    return await this.searchService.deleteDocument(data);
  }

  private bulkIndex(productId: number): any {
    return {
      _index: productIndex._index,
      _id: productId,
    };
  }

  private productDocument(product: any): any {
    const bulk = [];
    bulk.push({
      index: this.bulkIndex(product.id),
    });

    let temp = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price
    }

    bulk.push(temp);

    return {
      body: bulk,
      index: productIndex._index,
    };
  }

}