import { BaseUrl } from '../Global/constants.js'
import { Category } from '../models/index.js'

const getAllCategory = async () => {
    debugger
    let allCategory = await Category.find()
    const newCategory = allCategory.map((item) => {
        const { imagesList, ...other } = item._doc
        const data = {...other, image: `${BaseUrl}category/image/${other._id}`}
        return data
    })
    return newCategory
}
const getCategoryById = async (categoryId) => {
    const category = await Category.findById(categoryId)
    if (!category) {
        throw new Exception('Cannot find Category with id ' + categoryId)
    }
    return category
}


const insertCategory = async ({
    name,
    imagesList,
}) => {
    try {
        debugger
        const category = await Category.create({
            name,
            imagesList,
        })
        return {
            ...category._doc,
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

const deleteCategory = async (categoryId) => {
    try {
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            throw new Error('category not found');
        }
        return {
            message: 'category deleted successfully',
            data: null,
        };
    } catch (exception) {
        throw new Error('Error deleting category: ' + exception.message);
    }
};

const updateCategory = async ({
    id,
    name,
    imagesList,
}) => {
    const category = await Category.findById(id)
    debugger
    category.name = name ?? category.name
    category.imagesList = imagesList ?? category.imagesList
    await category.save()
    return {
        ...category._doc,
        imagesList: null,
    }
}

export default {
    getAllCategory,
    insertCategory,
    getCategoryById,
    deleteCategory,
    updateCategory,
}