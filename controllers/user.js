import {
  validationResult
} from 'express-validator';
import { EventEmitter } from 'node:events';
import HttpStatusCode from '../exceptions/HttpStatusCode.js';
import {
  userRepository
} from '../repositories/index.js';

const myEvent = new EventEmitter()
myEvent.on('event.register.user', (params) => {
  console.log(`They talked about : ${JSON.stringify(params)}`)
})

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: errors.array()
    });
  }
  const { email, password } = req.body;
  try {
    let existingUser = await userRepository.login({ email, password })
    res.status(HttpStatusCode.OK).json({
      message: 'Login user successfully',
      data: existingUser
    })
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    })
  }
}
const register = async (req, res) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    address
  } = req.body

  myEvent.emit('event.register.user', { email, phoneNumber })
  try {
    debugger
    const user = await userRepository.register({
      name,
      email,
      password,
      phoneNumber,
      address
    })
    res.status(HttpStatusCode.INSERT_OK).json({
      message: 'Register user successfully',
      data: user
    })
  } catch (exception) {
    debugger
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    })
  }

}
const getDetailUser = async (req, res) => {
  try {
    debugger
    const userId = req.params.id;
    const user = await userRepository.getUserById(userId)
    res.status(HttpStatusCode.OK).json({
      message: 'get user successfully',
      data: user,
    })
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    })
  }
}

const getAllUser = async (req, res) => {
  try {
    debugger
    const user = await userRepository.getAllUser()
    res.status(HttpStatusCode.OK).json({
      message: 'get user successfully',
      data: user,
    })
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    })
  }
}

async function updateAddressUser(req, res) {
  try {
    debugger
    const user = await userRepository.updateAddressUser(req.body)
    res.status(HttpStatusCode.OK).json({
      message: 'Update user successfully',
      data: user,
    })
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    })
  }
}

async function updateFavoriteUser(req, res) {
  try {
    debugger
    const user = await userRepository.updateFavoriteUser(req.body)
    res.status(HttpStatusCode.OK).json({
      message: 'Update user successfully',
      data: user,
    })
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.message,
    })
  }
}

async function deleteUser(req, res) {
  try {
      const id = req.params.id;
      const result = await userRepository.deleteUser(id);
      res.status(HttpStatusCode.OK).json(result);
  } catch (exception) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          message: 'Cannot delete product:' + exception.message,
      });
  }
}

export default {
  deleteUser,
  getAllUser,
  login,
  register,
  getDetailUser,
  updateAddressUser,
  updateFavoriteUser
}