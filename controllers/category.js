import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import { categoryRepository } from '../repositories/index.js'

async function getAllCategory(req, res) {
    try {
        let filteredCategory = await categoryRepository.getAllCategory()
        res.status(HttpStatusCode.OK).json({
            message: 'Get Category successfully',
            data: filteredCategory,
        })
    } catch (exception) {
        res.status(HttpStatusCode.InternalServerError).json({
            message: exception.message,
        })
    }
}

async function updateCategory(req, res) {
    try {
        debugger
        const { file } = req;
        const {
            name,
            id,
        } = req.body;
        const category = await categoryRepository.updateCategory({
            id,
            name,
            imagesList: file.buffer,
        })
        res.status(HttpStatusCode.OK).json({
            message: 'Update Category successfully',
            data: category,
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

const insertCategory = async (req, res) => {
    try {
        debugger
        const { file } = req;
        const {
            name,
        } = req.body;

        const category = await categoryRepository.insertCategory({
            name,
            imagesList: file.buffer,
        });

        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Insert Category successfully',
            data: category,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert Category:' + exception,
            validationErrors: exception.validationErrors,
        });
    }
};

async function deleteCategory(req, res) {
    try {
        const categoryId = req.params.categoryId;
        const result = await categoryRepository.deleteCategory(categoryId);
        res.status(HttpStatusCode.OK).json(result);
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot delete Category:' + exception.message,
        });
    }
}

const getCategoryImage = async (req, res) => {
    try {
        debugger
        const categoryId = req.params.categoryId;

        const category = await categoryRepository.getCategoryById(categoryId);

        if (!category) {
            return res.status(HttpStatusCode.NOT_FOUND).json({
                message: 'Category not found',
            });
        }

        res.set('Content-Type', 'image/jpeg');
        res.send(category.imagesList);

    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot get Category image:' + exception.message,
        });
    }
};



export default {
    getAllCategory,
    updateCategory,
    deleteCategory,
    insertCategory,
    getCategoryImage,
}