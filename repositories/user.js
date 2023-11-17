import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Exception from '../exceptions/Exception.js'
import { User } from '../models/index.js'

const login = async ({ email, password }) => {
  let existingUser = await User.findOne({ email }).exec()
  if (existingUser) {
    let isMatch = await bcrypt.compare(password, existingUser.password)
    if (!!isMatch) {
      //create Java Web Token
      let token = jwt.sign({
        data: existingUser
      },
        process.env.JWT_SECRET, {
        //expiresIn: '60', //1 minute
        expiresIn: '30 days'
      }
      )
      return {
        ...existingUser.toObject(),
        password: "not show",
        token: token
      }
    } else {
      throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD)
    }
  } else {
    throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD)
  }
}
const register = async ({
  name,
  email,
  password,
  phoneNumber,
  address,
  role
}) => {
  debugger;
  const existingUser = await User.findOne({ email }).exec();
  if (!!existingUser) {
    throw new Exception(Exception.USER_EXIST);
  }

  const hashedPassword = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  //insert to db
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    address,
    role: role ?? 'user'
  });
  return {
    ...newUser._doc,
    password: "Not show",
  };
}

const getUserById = async (userId) => {
  const user = await User.findById(userId)
  if (!user) {
    throw new Exception('Cannot find product with id ' + userId)
  }
  return { ...user._doc, password: "Not show" }
}

const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      message: 'User deleted successfully',
      data: null,
    };
  } catch (exception) {
    throw new Error('Error deleting user: ' + exception.message);
  }
}

const getAllUser = async () => {
  const user = await User.find()
  if (!user) {
    throw new Exception('Cannot find user')
  }
  const newUsers = user.map((item) => ({ ...item._doc, password: 'Not show' }))
  return newUsers
}

const updateAddressUser = async ({
  id,
  default_shipping_id,
}) => {
  const user = await User.findById(id)
  debugger
  user.default_shipping_id = default_shipping_id ?? user.default_shipping_id
  await user.save()
  return { ...user._doc, password: "Not show" }
}

const updateFavoriteUser = async ({
  id,
  favoritesList,
}) => {
  const user = await User.findById(id)
  debugger
  user.favoritesList = favoritesList ?? user.favoritesList
  await user.save()
  return { ...user._doc, password: "Not show" }
}

export default {
  deleteUser,
  getAllUser,
  login,
  register,
  getUserById,
  updateAddressUser,
  updateFavoriteUser,
}