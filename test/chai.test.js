import mongoose from "mongoose";
import UserDaoMongo from "../src/dao/Mongo/userDao.mongo.js";
import { chai } from "@bundled-es-modules/chai";

const expect = chai.expect
mongoose.connect('mongodb://127.0.0.1:27017/clase21')

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
        // con assert
        // assert.strictEqual(Array.isArray(result),true)

        // con chai
        // expect(result).to.be.deep.equal([])
        // expect(result).deep.equal([])
        // expect(Array.isArray(result)).to.be.ok
        expect(Array.isArray(result)).to.be.equal(true)

    })
    it('El dao debe agregar un usuario correctamente a la base de datos ', async function () {
        let mockUser = {
            first_name: 'Baruch',
            last_name: 'Prueba test',
            full_name: 'A ver si si sale',
            email: 'Baruch@aaaaaa.com',
            password: '123aaa'
        }
        const result = await this.userDao.create(mockUser)

        expect(result).to.have.property('_id')
        expect(result).to.have.property('first_name', 'Baruch')
        expect(result).to.be.an('object')

    })


})