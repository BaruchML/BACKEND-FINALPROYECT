
//Repositories
import UserRepository from "./user.repository.js";
import ProductRepository from "./product.repository.js";
import CartRepository from "./cart.repository.js";
import TicketRepository from "./ticket.repository.js";

//Importación del dao a travez del factory
import { UserDao, ProductDao, CartDao, TicketDao } from "../dao/factory.js";

//userService es un objeto instanciado con todos los metodos de repository
const userService = new UserRepository(new UserDao())
const productService = new ProductRepository(new ProductDao())
const cartService = new CartRepository(new CartDao())
const ticketService = new TicketRepository(new TicketDao())

export {
    userService,
    productService,
    cartService,
    ticketService
}