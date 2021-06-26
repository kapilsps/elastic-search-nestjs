import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService){}

    @Post('/create')
    async create(@Body(ValidationPipe) createProductDto: CreateProductDto): Promise<Product> {
        return await this.productService.create(createProductDto);
    }

    @Get('/all-products')
    async getAll(): Promise<Product[]> {
        return await this.productService.findAll();
    }

    @Patch('/update/:id')
    async update(@Param('id') id: string, @Body(ValidationPipe) updateProductDto: CreateProductDto): Promise<any> {
        return await this.productService.update(id, updateProductDto);
    }

    @Get('/search')
    async search(@Query() query: any): Promise<any>{
        return await this.productService.search(query.q);
    }
}
