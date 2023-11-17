import {product} from '../../models/index.js'
import productRepository from '../../repositories/product.js'

describe('Some CRUD test', () => {
    it('Test number of products', async () => {
        debugger 
        let products = await productRepository.getAllproducts({
            page: 1,
            size: 20,
            searchString: ''
        })
        //
    })
})