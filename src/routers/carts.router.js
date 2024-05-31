import { Router } from 'express'
import { CartController } from '../controllers/carts.controller.js'
import { authorization } from "../middleware/authorization.middleware.js";
import { passportCall } from '../middleware/passportCall.js';
import { TicketController } from '../controllers/ticket.controller.js'

const router = Router()
const {
    getCarts,
    getCartById,
    createCart,
    createCartBody,
    addProductToCart,
    deleteProductFromCart,
    deleteCart } = new CartController()
const { ticketPost } = new TicketController()
router
    .get('/', authorization(['PUBLIC']), getCarts)
    .get('/:cid', authorization(['PUBLIC']), getCartById)
    .post('/', authorization(['PUBLIC']), createCart)
    .post('/create', authorization(['PUBLIC']), createCartBody)
    .put('/:cid/:pid', authorization(['PUBLIC']), addProductToCart)
    .delete('/:cid/:pid', authorization(['PUBLIC']), deleteProductFromCart)
    .post('/:cid/purchase', passportCall('jwt'), authorization(['USER', 'ADMIN']), ticketPost)
    .delete('/:cid', authorization(['PUBLIC']), deleteCart)

export default router