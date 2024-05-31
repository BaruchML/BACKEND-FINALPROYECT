import mongoose from "mongoose";
import ProductDaoMongo from "../src/dao/Mongo/productDao.mongo.js"
import { chai } from "@bundled-es-modules/chai";


const expect = chai.expect
mongoose.connect('mongodb://127.0.0.1:27017/clase21')

describe('Testing product dao', () => {
    before(function () {
        this.productDao = new ProductDaoMongo()
    })
    beforeEach(function () {

        this.timeout(5000)
    })

    it('El Dao debe poder crear un producto', async function () {
        let mockProduct = {
            title: 'Celular',
            category: 'Tecnologia',
            stock: 20,
            price: 1000
        }
        const result = await this.productDao.create(mockProduct)
        console.log(result);
        expect(result).to.be.an('object')
        expect(result).to.have.property('_id')
        expect(result).to.have.property('isActive')
    })

})