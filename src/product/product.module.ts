import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product, ProductSchema } from './schemas/product.schema';
import { ProductElasticIndex } from '../elastic-search/search-index/product.elastic.index';
import { ElasticSearchModule } from '../elastic-search/elastic-search.module';
import { ElasticSearchService } from '../elastic-search/elastic-search.service';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: Product.name,
    imports: [ElasticSearchModule],
    useFactory: (productElaticIndex: ProductElasticIndex) => {
      const schema = ProductSchema;
      schema.post('findOneAndUpdate', async function(next) {
        const doc = await this.findOne(this.getQuery());
        await productElaticIndex.updateProductDocument(doc);
      });

      schema.post('save', async (doc, next) => {
        console.log('save', doc);

        await productElaticIndex.insertProductDocument(doc);
      });


      return schema;
    },
    inject: [ProductElasticIndex],
  }])],
  providers: [ProductService, {
    provide: 'SearchServiceInterface',
    useClass: ElasticSearchService
  }],
  controllers: [ProductController]
})
export class ProductModule {}
