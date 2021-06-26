import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ElasticSearchModule } from './elastic-search/elastic-search.module';

@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost:27017/elatic_search_nest_js', {
     useFindAndModify: false  }), ProductModule, ElasticSearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
