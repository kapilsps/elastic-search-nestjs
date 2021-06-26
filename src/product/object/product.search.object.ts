import { productIndex } from "../../elastic-search/constant/product.elastic";

export class ProductSearchObject {
    public static searchObject(q: any) {
        const body =  {
            size: 20,
            from: 0,
            query: {
                query_string: {
                    query: q
                }
            }
        };
        
        return { index: productIndex._index, body };
    }
}