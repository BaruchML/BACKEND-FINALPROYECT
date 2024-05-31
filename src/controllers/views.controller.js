
import { productService, userService } from "../repositories/index.repository.js"
import { cartService } from "../repositories/index.repository.js"
import loggerWinston from "../utils/logger.js"


export class ViewsController {
    constructor(){

    }
    renderProducts = async (req,res)=>{
        try {
            let products = await productService.getProducts()
            res.status(200).render('products',{products,showNav:true})
        } catch (error) {
            loggerWinston.error(error)
        }
    }
    renderInicio = async (req,res) => {
        try {
            res.render('index',{showNav:true})
        } catch (error) {
            loggerWinston.error(error);
        }
    }
    renderProfile = async (req,res) => {
        try {
            res.status(200).render('profile',{showNav:true})
        } catch (error) {
            loggerWinston.error(error)
        }
    }
    renderDetail = async (req,res) => {
        try {
            const {pid} = req.params
            const product = await productService.getProductBy(pid)
            res.render('detail', {
                product,
                showNav: true
            })
        } catch (error) {
            loggerWinston.error(error)
        }
    }
    renderCart = async (req,res) => {
        try {
            const { cid } = req.params;
            const cart = await cartService.getCartBy(cid);
            const user = await userService.getUserBy({email:cart.emailUser})
            if(!cart){res.status(401).send({error: 'Cart not found'})}else{

                res.status(200).render('cart',{cart,user,
                    showNav:true
                })
            }
        } catch (error) {
            
            loggerWinston.error(error)
        }
    }
    renderLogin = async (req,res) => {
        try {
            res.status(200).render('login',{showNav:true})
        } catch (error) {
            loggerWinston.error(error)
        }
    }
    renderRegister = async (req,res) => {
        try {
            
            res.status(200).render('register',{
                showNav:true
            })
        } catch (error) {
            loggerWinston.error(error)
        }
    }
   
    renderChat = async (req,res) => {
        try {
            res.status(200).render('chat',{showNav:true})
        } catch (error) {
            loggerWinston.error(error)
        }
    }
    renderForgotPassword = async(req,res)=>{
        try {
            res.status(200).render('forgotPassword',{showNav:true})
        } catch (error) {
            loggerWinston.error(error)
        }
    }
    renderResetPassword = async(req,res)=>{
        try {
            res.status(200).render('resetPassword',{showNav:true})
        } catch (error) {
            loggerWinston.error(error)
        }
    }
    renderUsersControl = async(req,res)=>{
        try {
            res.status(200).render('usersControl',{showNav:true})
        } catch (error) {
            
        }
    }
}

