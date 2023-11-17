import { Product } from '../models/index.js'
import { BaseUrl } from '../Global/constants.js'

const getAllProducts = async () => {
    debugger
    let allProducts = await Product.find()
    const newProducts = allProducts.map((item) => {
        const { imagesList, ...other } = item._doc
        const data = {...other, image: `${BaseUrl}products/image/${other._id}`}
        return data
    })
    return newProducts
}
const getProductById = async (productId) => {
    const product = await Product.findById(productId)
    if (!product) {
        throw new Exception('Cannot find product with id ' + productId)
    }
    return product
}

const insertProduct = async ({
    name,
    description,
    colorList,
    price,
    quantity,
    categoryId,
    imagesList,
    createAt,
}) => {
    try {
        debugger
        const product = await Product.create({
            name,
            description,
            colorList,
            price,
            quantity,
            categoryId,
            imagesList,
            createAt,
        })
        return {
            ...product._doc,
            imagesList: null,
        }
    } catch (exception) {
        if (!!exception.errors) {
            throw new Exception('Input error', exception.errors)
        }
        debugger
    }
    debugger
}

const deleteProduct = async (productId) => {
    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        return {
            message: 'Product deleted successfully',
            data: null,
        };
    } catch (exception) {
        throw new Error('Error deleting product: ' + exception.message);
    }
};

const updateProduct = async ({
    id,
    name,
    description,
    colorList,
    price,
    quantity,
    categoryId,
}) => {
    const product = await Product.findById(id)
    debugger
    product.name = name ?? product.name
    product.description = description ?? product.description
    product.colorList = colorList ?? product.colorList
    product.price = price ?? product.price
    product.quantity = quantity ?? product.quantity
    product.categoryId = categoryId ?? product.categoryId
    await product.save()
    return product
}

export default {
    getAllProducts,
    insertProduct,
    getProductById,
    deleteProduct,
    updateProduct,
}