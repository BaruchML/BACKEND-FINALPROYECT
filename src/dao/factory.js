import { configObject, connectDB } from "../config/config.js";
//DAO
import UserDaoMongo from "./Mongo/userDao.mongo.js";
import ProductDaoMongo from "./Mongo/productDao.mongo.js";
import CartDaoMongo from "./Mongo/cartDao.mongo.js";
import TicketDaoMongo from "./Mongo/ticketDao.mongo.js";
//FILE
//MEMORY

let UserDao
let CartDao
let ProductDao
let TicketDao

//persistence MONGO
switch (configObject.persistence) {
    case 'FILE':
        //poner archivos file

        break;
    case 'MEMORY':
        //poner archivos memory

        break;

    default:
        connectDB()
        UserDao = UserDaoMongo
        ProductDao = ProductDaoMongo
        CartDao = CartDaoMongo
        TicketDao = TicketDaoMongo
        break;
}

export { UserDao, ProductDao, CartDao, TicketDao }