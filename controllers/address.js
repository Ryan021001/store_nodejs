import HttpStatusCode from '../exceptions/HttpStatusCode.js'
import { addressRepository } from '../repositories/index.js'

async function getAllAddress(req, res) {
    debugger
    try {
        const filteredAllAddress = await addressRepository.getAllAddress()
        res.status(HttpStatusCode.OK).json({
            message: 'Get address successfully',
            data: filteredAllAddress,
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

async function getAddressByUserId(req, res) {
    debugger
    try {
        const userId = req.params.userId;
        const filterAllAddress = await addressRepository.getAddressByUserId(userId)
        res.status(HttpStatusCode.OK).json({
            message: 'Get address successfully',
            data: filterAllAddress,
        })
    } catch (exception) {
        res.status(HttpStatusCode.InternalServerError).json({
            message: exception.message,
        })
    }
}

async function getAddressById(req, res) {
    debugger
    try {
        const id = req.params.id;
        const filterAllAddress = await addressRepository.getAddressById(id)
        res.status(HttpStatusCode.OK).json({
            message: 'Get address successfully',
            data: filterAllAddress,
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

async function updateAddress(req, res) {
    try {
        debugger
        const address = await addressRepository.updateAddress(req.body)
        res.status(HttpStatusCode.OK).json({
            message: 'Update address successfully',
            data: address,
        })
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: exception.message,
        })
    }
}

const insertAddress = async (req, res) => {
    try {
        debugger
        const {
            fullName,
            address,
            userId,
            phoneNumber,
        } = req.body;

        const addressSever = await addressRepository.insertAddress({
            fullName,
            address,
            userId,
            phoneNumber,
        });

        res.status(HttpStatusCode.INSERT_OK).json({
            message: 'Insert address successfully',
            data: addressSever,
        });
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot insert address:' + exception,
            validationErrors: exception.validationErrors,
        });
    }
};

async function deleteAddress(req, res) {
    try {
        const addressId = req.params.addressId;
        const result = await addressRepository.deleteAddress(addressId);
        res.status(HttpStatusCode.OK).json(result);
    } catch (exception) {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: 'Cannot delete address:' + exception.message,
        });
    }
}


export default {
    getAddressByUserId,
    getAddressById,
    getAllAddress,
    updateAddress,
    deleteAddress,
    insertAddress,
}