import { IsInt, IsNumber, IsString, Min, MinLength } from "class-validator";


export class CreateProductDto{
    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    @MinLength(2)
    description: string;

    @IsInt()
    price: number;
}