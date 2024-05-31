
import { cartService, productService } from "../repositories/index.repository.js"
import loggerWinston from "../utils/logger.js"

export class CartController {
    constructor() {
        this.service = cartService
        this.serviceProduct = productService
    }
    getCarts = async (req, res) => {
        try {
            const allCarts = await this.service.getCarts()

            res.send({
                status: 'Success',
                result: allCarts
            })

        } catch (error) {
            loggerWinston.error(error);
        }

    }

    getCartById = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await this.service.getCartBy(cid);

            res.send({
                status: 'Success',
                result: cart
            })
        } catch (error) {
            loggerWinston.error(error);
        }

    }

    createCart = async (req, res) => {
        try {
            // const {body} = req
            const newCart = await this.service.createCart()
            res.send({
                status: 'Success',
                result: newCart
            })
        } catch (error) {
            loggerWinston.error(error);
        }

    }
    createCartBody = async (req, res) => {
        try {
            const {title,emailUser} = req.body
            const cart = {title,emailUser}
            const newCart = await this.service.createCart(cart)
            res.send({
                status: 'Success',
                result: newCart
            })
        } catch (error) {
            loggerWinston.error(error);
        }

    }
    addProductToCart = async (req, res) => {

        try {
            const { cid, pid } = req.params
            const { quantity } = req.body
            const product = { id: pid, quantity }
            const resp = await this.service.addProductToCart(cid, product)
            if (!resp) return res.status(404).json({status: 'error', message: 'Cart not found'})
            res.status(200).json({
                status: 'success', 
                message: 'Product added to cart'
            })        
        } catch (error) {
            loggerWinston.error(error)
        }
    }

    deleteProductFromCart  = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const resp = await this.service.deleteProductFromCart(cid, pid)
          
            if (!resp) return res.status(404).json({status: 'error', message: 'Cart not found'})
            res.status(200).json({
                status: 'success',
                message: 'Product deleted from cart'
            })        
        } catch (error) {
         
            loggerWinston.error(error)
        }
    }

    deleteCart = async (req, res) => {
        try {
            const { cid } = req.params
            const deleteCart = await this.service.deleteCart(cid)
            res.send({
                status: 'Success, cart delete'
            })
        } catch (error) {
            loggerWinston.error(error);
        }

    }
    


}
