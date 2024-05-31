import { userService, cartService } from "../repositories/index.repository.js";
import CustomError from "../utils/errors/customError.js";
import generateUserErrorInfo from "../utils/errors/info.js";
import Errors from "../utils/errors/enums.js";
import loggerWinston from "../utils/logger.js"
import jwt from "jsonwebtoken"
import { configObject } from "../config/config.js"
import { token } from "morgan";
export class UserController {
    constructor() {
        this.services = userService
        this.serviceCart = cartService
        this.config = configObject
    }
    getUsers = async (req, res) => {
        try {
            const users = await this.services.getUsers()

            loggerWinston.info(users);

            res.send(users)

        } catch (error) {
            loggerWinston.error(error);
        }

    }
    getUser = async (req, res) => {
        try {
            const { uid } = req.params;
            const user = await this.services.getUserById(uid);

            res.send({
                status: 'Success',
                result: user
            })
        } catch (error) {
            loggerWinston.error(error)
        }


    }

    getUsersPremium = async (req, res) => {
        try {
            const users = await this.services.getUsersPremium({ isPremium: true })

            loggerWinston.info(users);

            res.send(users)
        } catch (error) {
            loggerWinston.error(error)
        }
    }
    createUser = async (req, res, next) => {
        try {
            const { first_name, last_name, email, age, password, role } = req.body

            if (!last_name || !last_name || !email) {
                CustomError.createError({
                    name: "User creation error",
                    cause: generateUserErrorInfo({
                        first_name,
                        last_name,
                        email
                    }),
                    message: 'Error tryng to created user',
                    code: Errors.INVALID_TYPE_ERROR
                })
            }

            let carts = []
            const newUser = {
                first_name,
                last_name,
                email,
                age,
                password,
                role,
                carts
            }
            const newCart = {
                title: `${newUser.first_name} Cart`,
                emailUser: `${newUser.email}`
            }
            const cartDao = await this.serviceCart.createCart(newCart)
            const cart = await this.serviceCart.getCartByEmail({ emailUser: `${newUser.email}` })

            const user = await this.services.createUser(newUser)
            const userDao = await this.services.getUserBy({ email: `${newUser.email}` })
            userDao.carts.push({ cart })
            const finallUser = await this.services.updateUser(userDao._id, userDao)

            res.send({
                status: 'Success',
                usersCreate: finallUser
            })

        } catch (error) {
            next(error)
        }

    }
    updateUserToPremium = async (req, res) => {
        try {
            const { cid } = req.params

            const cart = await this.serviceCart.getCartBy(cid)
            const user = await this.services.getUserBy({ email: `${cart.emailUser}` })

            if (user.documents.length < 3) return res.status(400).send({ status: 'error', message: "No tienes suficiente documentación" })

            const userPremium = await this.services.updateUserToPremium(user._id)
            res.send({
                status: 'success',
            })
        } catch (error) {
            loggerWinston.error(error)
        }

    }
    deleteUser = async (req, res) => {
        try {
            const { uid } = req.params
            const result = await this.services.deleteUser(uid)
            res.send({
                status: 'Success, user delete'
            })
        } catch (error) {
            loggerWinston.error(error)
        }

    }

    getDocuments = async (req, res) => {
        try {
            const { uid } = req.params

            const user = await this.services.getUserById(uid)
            const result = console.log(user.documents);
            res.send({
                status: 'Success, there is user documents',
                payload: result
            })
        } catch (error) {
            loggerWinston.error(error)

        }
    }
    profileImg = async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).send({ status: "error", message: "No hay files" })
            }

            const token = req.cookies['cookieToken']

            const decodedUser = jwt.verify(token, this.config.jwt_secret_key)

            if (!decodedUser) return res.status(400).send({ status: 'error', message: 'El token no es válido o ha expirado' })

            const userDB = await this.services.getUserBy({ email: decodedUser.email })
            if (!userDB) return res.status(400).send({ status: 'error', message: 'El usuario no existe' })
            const profileImg = req.file.filename
            userDB.thumbnail = profileImg
            const finallUser = await this.services.updateUser(userDB._id, userDB)
            return res.status(200).send({ status: "success", message: "Llego el file" })

        } catch (error) {
            loggerWinston.error(error)
        }
    }
    documentsUser = async (req, res) => {
        try {
            if (!req.files) {
                return res.status(400).send({ status: "error", message: "No hay files" })
            }

            const token = req.cookies['cookieToken']

            const decodedUser = jwt.verify(token, this.config.jwt_secret_key)

            if (!decodedUser) return res.status(400).send({ status: 'error', message: 'El token no es válido o ha expirado' })

            const userDB = await this.services.getUserBy({ email: decodedUser.email })
            if (!userDB) return res.status(400).send({ status: 'error', message: 'El usuario no existe' })
            if (userDB.documents.length >= 3) return res.status(400).send({ status: 'error', message: 'El usuario ya tiene los documentos cargados' })
            for (const item of req.files) {

                const filename = item.filename
                userDB.documents.push(filename)

            }
            const finallUser = await this.services.updateUser(userDB._id, userDB)
            return res.status(200).send({ status: "success", message: "Llego el file" })


        } catch (error) {
            loggerWinston.error(error)
        }
    }
}

