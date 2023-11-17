import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import { productRepository } from '../repositories/index.js'

async function getAllProducts(req, res) {
    try {
        let filteredProducts = await productRepository.getAllProducts()
        res.status(HttpStatusCode.OK).json({
            message: 'Get products successfully',
            data: filteredProducts,
        })
    } catch (exception) {
        res.status(HttpStatusCode.InternalServerError).json({
            message: exception.message,
        })
    }
}

async function updateProduct(req, res) {
    try {
        debugger
        const product = await productRepository.updateProduct(req.body)
        res.status(HttpStatusCode.OK).json({
            message: 'Update product successfully',
            data: product,
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

const insertProduct = async (req, res) => {
    try {
        debugger
        const { file } = req;
        const {
            name,
            description,
            colorList,
            price,
            quantity,
            categoryId,
            createAt,
        } = req.body;

        const product = await productRepository.insertProduct({
            name,
            description,
            colorList,
            price,
            quantity,
            categoryId,
            createAt,
            imagesList: file.buffer,
        });

        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Insert product successfully',
            data: product,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert product:' + exception,
            validationErrors: exception.validationErrors,
        });
    }
};

async function deleteProduct(req, res) {
    try {
        const productId = req.params.productId;
        const result = await productRepository.deleteProduct(productId);
        res.status(HttpStatusCode.OK).json(result);
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot delete product:' + exception.message,
        });
    }
}

const getProductImage = async (req, res) => {
    try {
        debugger
        const productId = req.params.productId;

        const product = await productRepository.getProductById(productId);

        if (!product) {
            return res.status(HttpStatusCode.NOT_FOUND).json({
                message: 'Product not found',
            });
        }

        res.set('Content-Type', 'image/jpeg');
        res.send(product.imagesList);

    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot get product image:' + exception.message,
        });
    }
};



export default {
    getAllProducts,
    updateProduct,
    deleteProduct,
    insertProduct,
    getProductImage,
}