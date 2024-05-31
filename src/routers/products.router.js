import { Router } from 'express'
import { ProductController } from '../controllers/products.controller.js'
import { authorization } from "../middleware/authorization.middleware.js";
const router = Router()
const {
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct } = new ProductController()
router
    .get('/', authorization(['PUBLIC']), getProducts)
    .get('/:pid', authorization(['PUBLIC']), getProduct)
    .post('/', authorization(['PUBLIC']), createProduct)
    .put('/:pid/:desc', authorization(['PUBLIC']), updateProduct)
    .delete('/:pid', authorization(['PUBLIC']), deleteProduct)


export default router