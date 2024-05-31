import { Router } from 'express'
import { ViewsController } from '../controllers/views.controller.js'
import { authorization } from '../middleware/authorization.middleware.js'
import { passportCall } from '../middleware/passportCall.js'
import { userService } from '../repositories/index.repository.js'
import { ProductController } from '../controllers/products.controller.js'
const router = Router()

const { renderInicio,
    renderProducts,
    renderCart,
    renderDetail,
    renderLogin,
    renderProfile,
    renderRegister,
    renderChat,
    renderForgotPassword,
    renderResetPassword
} = new ViewsController()
const { getProducts } = new ProductController()

// PROYECTO FINAL
router
    .get('/', authorization(['PUBLIC']), renderProducts)
    .get('/inicio', authorization(['PUBLIC']), renderInicio)
    .get('/profile', passportCall('jwt'), authorization(['USER', 'ADMIN']), renderProfile)
    .get('/detail/:pid', authorization(['PUBLIC']), renderDetail)
    .get('/cart/:cid', passportCall('jwt'), authorization(['USER', 'ADMIN']), renderCart)
    .get('/login', authorization(['PUBLIC']), renderLogin)
    .get('/register', authorization(['PUBLIC']), renderRegister)
    .get('/forgotPassword', authorization(['PUBLIC']), renderForgotPassword)
    // .get('/resetPassword/:token',         authorization(['PUBLIC']), renderResetPassword)

    .get('/chat', authorization(['PUBLIC']), renderChat)

export default router