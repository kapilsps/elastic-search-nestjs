import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigSearch } from './config/config.search';
import { SearchServiceInterface } from './interface/search.service.interface';

@Injectable()
export class ElasticSearchService extends ElasticsearchService implements SearchServiceInterface<any> {
    constructor() {
        super(ConfigSearch.searchConfig('http://localhost:9200/'));
    }

    public async insertIndex(bulkData: any): Promise<any> {
        return await this.bulk(bulkData);
    }

    public async updateIndex(updateData: any): Promise<any> {
        return await this.update(updateData);
    }

    public async searchIndex(searchData: any): Promise<any> {
        return await this.search(searchData);
    }

    public async deleteIndex(indexData: any): Promise<any> {
        return await this.indices.delete(indexData);
    }

    public async deleteDocument(indexData: any): Promise<any> {
        return await this.delete(indexData);
    }
}
