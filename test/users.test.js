import mongoose from "mongoose";
import UserDaoMongo from "../src/dao/Mongo/userDao.mongo.js";
import Assert from "node:assert"

// import { configObject } from "../src/config/config.js";

mongoose.connect('mongodb://127.0.0.1:27017/clase21')
const assert = Assert.strict

describe('Testing user dao', () => {
    before(function () {
        this.userDao = new UserDaoMongo()
    })
    beforeEach(function () {
        mongoose.connection.collections.users.drop()
        this.timeout(5000)
    })

    it('El Dao debe poder obtener los usuarios en formato de array', async function () {
        console.log(this.userDao);

        const result = await this.userDao.get()
        assert.strictEqual(Array.isArray(result), true)

    })
    it('El dao debe agregar un usuario correctamente a la base de datos y un carrito vacio ', async function () {
        let mockUser = {
            first_name: 'Baruch',
            last_name: 'Prueba test',
            full_name: 'A ver si si sale',
            email: 'users@gmail',
            password: '123aaa'
        }
        const result = await this.userDao.create(mockUser)
        assert.ok(result._id)
        //comparacion de propiedades internas
        assert.deepStrictEqual(result.carts, [])
    })

})