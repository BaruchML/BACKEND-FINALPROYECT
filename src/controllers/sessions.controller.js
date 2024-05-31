import { createHash, isInvalidPassword } from "../utils/hashBcrypt.js";
import generateToken from "../utils/jsonwebtoken.js";
import { cartService, userService } from "../repositories/index.repository.js";
import { sendMail } from "../utils/sendEmail.js";
import loggerWinston from "../utils/logger.js";
import { configObject } from "../config/config.js"
import jwt from "jsonwebtoken"




export class SessionController {
    constructor() {
        this.services = userService
        this.serviceCart = cartService
        this.config = configObject
    }

    register = async (req, res) => {

        try {
            const { first_name, last_name, email, password, role } = req.body

            // validar los datos recibidos
            if (!first_name || !last_name || !email || !password || !role) return res.status(400).send({ status: 'error', error: 'Values incomplete' })
            const exists = await this.services.getUserBy({ email })
            const existCart = await this.serviceCart.getCartByEmail({ emailUser: `${email}` })

            if (exists) return res.status(401).send({ status: 'error', message: 'El usuario ya existe' })
            if (existCart) return res.status(401).send({ status: 'error', message: 'El correo tiene un carrito asignado' })

            let carts = []
            const newUser = {
                first_name,
                last_name,
                email,
                password: createHash(password),
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

            //TOKEN 
            //NO GUARDAR DATOS SENSIBLES
            loggerWinston.info(finallUser);

            const token = generateToken({
                fullname: `${finallUser.first_name} ${finallUser.last_name}`,
                role: finallUser.role,
                email: finallUser.email
            })

            res.cookie('cookieToken', token, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true
            }).send({
                status: 'success', payload: finallUser, token,
                cid: cart.id,
            })

        } catch (error) {
            loggerWinston.error({ status: 'error', error: error.message });

        }

    }
    login = async (req, res) => {
        try {
            const { email, password } = req.body

            if (!email || !password) return res.status(400).send({ status: 'error', message: 'Values incomplete' })

            const userFoundDB = await this.services.getUserBy({ email })

            if (!userFoundDB) return res.status(401).send({ status: 'error', message: 'No se encuentra el usuario' })

            if (!isInvalidPassword({ password: userFoundDB.password }, password)) return res.status(400).send({ status: 'error', message: 'No coinciden las credenciales' })

            const cart = await this.serviceCart.getCartByEmail({ emailUser: `${userFoundDB.email}` })

            const token = generateToken({
                fullname: `${userFoundDB.first_name} ${userFoundDB.last_name}`,
                role: userFoundDB.role,
                email: userFoundDB.email
            })

            //esta vinculado a jwtoken
            res.cookie('cookieToken', token, {
                maxAge: 60 * 60 * 1000 * 24,
                httpOnly: true
            }).send({
                status: 'success',
                token,
                cid: cart.id,

            })
        } catch (error) {
            loggerWinston.error({ status: 'error', error: error.message });
        }
    }

    current = async (req, res) => {
        try {
            res.send({ message: 'datos sensibles' })

        } catch (error) {
            loggerWinston.error({ status: 'error', error: error.message });
        }
    }

    logout = async (req, res) => {
        try {

            res.clearCookie('cookieToken')
            res.status(200).redirect('/login')

        } catch (error) {
            loggerWinston.error({ status: 'error', error: error.message });
        }
    }

    forgotPassword = async (req, res) => {
        try {
            const { email } = req.body
            const user = await this.services.getUserBy({ email })
            if (!user) return res.status(400).send({ status: 'error', message: 'El correo no se encuentra registrado' })
            const { password, _id } = user

            const token = generateToken({ user, expiresIn: '1h' })
            const to = `${user.email}`
            const subject = 'Restablecer contraseña'
            const html = ` <p> Hola ${user.first_name}, </p>
                            <p> Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
                            // <a href="http://localhost:8080/api/sessions/resetPassword/${token}">Restablecer contraseña</a>
                            <p>Este enlace expirará en 1 hora.</p>`
            sendMail({ to, subject, html })
   
            res.status(200).send({ status: 'success', message: 'Mail enviado, revise su bandeja de entrada o spam' })
        } catch (error) {
            loggerWinston.error(error)
        }
    }
    resetPasswordToken = async (req, res) => {
        try {
            const { token } = req.params
            res.render('resetPassword', { token, showNav: true })
        } catch (error) {
            loggerWinston.error(error)
        }
    }
    resetPassword = async (req, res) => {
        try {
            const { passwordNew, passwordConfirm, token } = req.body
       
            if (!passwordNew || !passwordConfirm || passwordNew !== passwordConfirm) return res.status(400).send({
                status: 'error',
                message: 'Las contraseñas no pueden estar vacías y deben coincidir'
            })
            const decodedUser = jwt.verify(token, this.config.jwt_secret_key)

            if (!decodedUser) return res.status(400).send({ status: 'error', message: 'El token no es válido o ha expirado' })

            const userDB = await userService.getUserBy({ email: decodedUser.user.email })
            if (!userDB) return res.status(400).send({ status: 'error', message: 'El usuario no existe' })

          
            let validPass = isInvalidPassword({ password: userDB.password }, passwordNew)
           
            if (validPass) {
                return res.status(400).send({ status: 'error', message: 'No puedes usar una contraseña anterior.' })
            } else if (!validPass) {
                const result = await userService.updateUser(userDB._id, {
                    password: createHash(passwordNew)
                })

                if (!result) return res.status(400).send({ status: 'error', message: 'Error al actualizar la contraseña' })
                const cart = await this.serviceCart.getCartByEmail({ emailUser: `${userDB.email}` })
                const newToken = generateToken({
                    fullname: `${userDB.first_name} ${userDB.last_name}`,
                    role: userDB.role,
                    email: userDB.email
                })
  

                //esta vinculado a jwtoken
                res.cookie('cookieToken', newToken, {
                    maxAge: 60 * 60 * 1000 * 24,
                    httpOnly: true
                })

                res.status(200).send({
                    status: 'success',
                    message: 'Contraseña actualizada correctamente',
                    newToken,
                    cid: cart.id
                })
            }

        } catch (error) {
            loggerWinston.error(error)
        }
    }

}