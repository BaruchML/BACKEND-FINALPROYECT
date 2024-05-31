import { ticketService, productService, cartService, userService } from "../repositories/index.repository.js"
import loggerWinston from "../utils/logger.js"

export class TicketController {
    constructor() {
        this.service = ticketService
        this.serviceProduct = productService
        this.serviceCart = cartService
        this.serviceUser = userService
    }
    getTicket = async (req, res) => {
        try {
            const allCarts = await this.service.getTickets()

            res.send({
                status: 'Success',
                result: allCarts
            })

        } catch (error) {
            loggerWinston.error(error);
        }

    }

    getTicketBy = async (req, res) => {
        try {
            const { cid } = req.params;
            const cart = await this.service.getTicketBy(cid);

            res.send({
                status: 'Success',
                result: cart
            })
        } catch (error) {
            loggerWinston.error(error);
        }

    }

    createTicket = async (req, res) => {
        try {
            const { amount } = req.body
            const newTicket = { amount }
            const result = await this.service.createTicket(newTicket)
            res.send({
                status: 'Success',
                result: result
            })
        } catch (error) {
            loggerWinston.error(error);
        }

    }
    updateTicket = async (req, res) => {
        try {
            const { cid, pid } = req.params
            const product = await this.serviceProduct.getProductBy(pid)
            const cart = await this.service.getCartBy(cid)

            cart.products.push({ product })
            let result = await this.service.updateCart(cid, cart)

            res.json({
                status: 'SUCCESS',
                result: result
            })
        } catch (error) {
            loggerWinston.error(error);
        }
    }

    deleteTicket = async (req, res) => {
        try {
            const { cid } = req.params
            const deleteCart = await this.service.deleteTicket(cid)
            res.send({
                status: 'Success, cart delete'
            })
        } catch (error) {
            loggerWinston.error(error);
        }

    }
    ticketPost = async (req, res) => {
        try {

            const { cid } = req.params;
            const cart = await this.serviceCart.getCartBy(cid);

            if (!cart) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Cart not found'
                });
            }
            const user = await this.serviceUser.getUserBy({ email: cart.emailUser })

            // Array de IDs de productos que no se pudieron comprar
            const productsNotPurchased = [];
            const totalPurchase = [];
            // Comprobamos la disponibilidad de cada producto en el carrito
            for (const item of cart.products) {
                const product = item.product;
                const quantity = item.quantity;
                const productBase = await this.serviceProduct.getProductBy(product._id)
                const stock = productBase.stock

                if (quantity > stock) {
                    // Si no hay suficiente stock, agregamos el ID del producto a la lista de no comprados
                    productsNotPurchased.push(product._id);
                } else {
                    // Si hay suficiente stock, restamos la cantidad comprada del stock del producto
                    const newProduct = {
                        stock: stock - quantity
                    }
                    await this.serviceProduct.updateProduct(product._id, newProduct);
                    const productPrice = quantity * product.price
                    totalPurchase.push(productPrice)
                }
            }
            const total = await totalPurchase.reduce((a, b) => a + b, 0);
            if (productsNotPurchased.length > 0 && !totalPurchase.length > 0) return res.status(400).send({ status: 'error', error: 'No hay productos suficientes para comprar' })
            if (productsNotPurchased.length > 0) {

                const cartFiltred = cart.products.filter(item => !productsNotPurchased.includes(item.product._id))
                cart.products = cartFiltred
                
                await this.serviceCart.updateCartProducts(cid, cart)

                const ticket = {
                    purchaser: user.first_name,
                    amount: total,
                    productsPurchased: cart.products
                }
                const result = await this.service.createTicket(ticket)


                cart.products = []
                await this.serviceCart.updateCartProducts(cid, cart)
                res.status(200).json({
                    status: 'success',
                    message: 'Purchase completed successfully',
                    result: result
                });

            } else {

                const ticket = {
                    purchaser: user.first_name,
                    productsPurchased: cart.products,
                    amount: total
                }
                const result = await this.service.createTicket(ticket)
                cart.products = []
                await this.serviceCart.updateCartProducts(cid, cart)

                res.status(200).json({
                    status: 'success',
                    message: 'Purchase completed successfully',
                    result: result
                });

            }


        }
        catch (error) {
            loggerWinston.error(error);
        }

        ;
    }


}