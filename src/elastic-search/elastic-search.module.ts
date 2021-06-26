import { Module } from '@nestjs/common';
import { ElasticSearchService } from './elastic-search.service';
import { SearchServiceInterface } from './interface/search.service.interface';
import { ProductElasticIndex } from './search-index/product.elastic.index';

@Module({
  imports: [],
  controllers:[],
  providers: [{
    provide: 'SearchServiceInterface',
    useClass: ElasticSearchService
  }, ProductElasticIndex],
  exports: [ElasticSearchModule, ProductElasticIndex]
})
export class ElasticSearchModule {}
