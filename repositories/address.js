import Exception from "../exceptions/Exception.js"
import { Address } from "../models/index.js"

const getAllAddress = async () => {
    debugger
    const allAddress = await Address.find()
    return allAddress
}
const getAddressByUserId = async (userId) => {
    const address = await Address.find({ userId })
    if (!address) {
        throw new Exception('Cannot find Address with id ' + userId)
    }
    return address
}

const getAddressById = async (id) => {
    debugger
    const address = await Address.findOne({ _id: id })
    if (!address) {
        throw new Exception('Cannot find Address with id ' + id)
    }
    return address
}

const insertAddress = async ({
    fullName,
    address,
    userId,
    phoneNumber,
}) => {
    try {
        const addressModal = await Address.create({
            fullName,
            address,
            userId,
            phoneNumber,
        });
        return addressModal;
    } catch (exception) {
        if (!!exception.errors) {
            throw new Exception('Input error', exception.errors);
        }
    }
}


const deleteAddress = async (addressId) => {
    try {
        const addressSever = await Address.findByIdAndDelete(addressId);
        if (!addressSever) {
            throw new Error('Address not found');
        }
        return {
            message: 'Address deleted successfully',
            data: null,
        };
    } catch (exception) {
        throw new Error('Error deleting Address: ' + exception.message);
    }
};

const updateAddress = async ({
    id,
    fullName,
    address,
    phoneNumber,
}) => {
    const addressSever = await Address.findById(id)
    addressSever.fullName = fullName ?? Address.fullName
    addressSever.address = address ?? Address.address
    addressSever.phoneNumber = phoneNumber ?? Address.phoneNumber
    await addressSever.save()
    return addressSever
}

export default {
    getAllAddress,
    insertAddress,
    getAddressByUserId,
    deleteAddress,
    updateAddress,
    getAddressById,
}