import { productService } from "../repositories/index.repository.js"
import loggerWinston from "../utils/logger.js"

export class ProductController {
    constructor() {
        this.services = productService
    }
    getProducts = async (req, res) => {
        try {
            const allProducts = await this.services.getProducts()
            res.send({
                status: 'Success',
                payload: allProducts
            })
           
        } catch (error) {
            loggerWinston.error(error);
        }
    }
    getProduct = async (req, res) => {
        try {
            const { pid } = req.params;
            const product = await this.services.getProductBy(pid);
            res.send({
                status: 'Success',
                result: product
            })
        } catch (error) {
            loggerWinston.error(error);
        }
    }
    createProduct = async (req, res) => {
        try {
            const { title, description, price, stock, imgUrl } = req.body
            const newProduct = { title, description, price, stock, imgUrl }
            const result = await this.services.createProduct(newProduct)

            res.send({
                status: 'Success',
                result: result

            })
        } catch (error) {
            loggerWinston.error(error);
        }
    }
    updateProduct = async (req, res) => {
        try {
            //ingresar descuento por params
            const { pid, desc } = req.params
            if(desc > 50){
                res.send({
                    status: "error",
                    message:"Descuento no puede pasar de 50%"

                })
            }
            const product = await this.services.getProductBy(pid);
           
            const descuento = (price, desc) => {
                let porcentaje = desc / 100
                let multi = price * porcentaje
                let result = price - multi
                return result
            }

            const operation = descuento(product.price,desc)
            const newProduct = {
                price: operation
            }
            const productUpdated = await this.services.updateProduct(pid, newProduct)
            res.send({
                status: 'Success',
                promo: `${desc}% de descuento`,
                result: productUpdated
            })
        } catch (error) {
            loggerWinston.error(error);
        }
    }
    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params
            const deleteProd = await this.services.deleteProduct(pid)
            res.send({
                status: 'Success, product delete'
            })
        } catch (error) {
            loggerWinston.error(error);
        }


    }
}