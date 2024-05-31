import { chai } from "@bundled-es-modules/chai";
import { response } from "express";
import supertest from "supertest";


const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing general', () => {
    describe('Test de products', () => {
        it('Testing de endpoint POST /api/products debe crear un producto correctamente', async function () {
            const productMock = {
                title: 'Television',
                description: 'samsung',
                price: 100,
                stock: 10,
            }

            const resp = await requester.post('/api/products').send(productMock)  //metodo normal
            console.log(resp);

            const { statusCode, ok, _body } = await requester.post('/api/products').send(productMock)  //haciendo destructuring de variables y hacer validaciones
            expect(_body.result).to.have.property('_id')
            console.log(statusCode)
            console.log(ok)
            // expect(_body.result.isActive).to.be.equal(true)
            // expect(_body.result).to.have.property('isActive') //no me trae el isActive que se genera por default

        })
        it('Testing del endpoint GET /api/products debe traer todos los productos correctamente', async function () {
            const { _body, ok, statusCode } = await requester.get('/api/products')
            expect(ok).to.be.true
            expect(statusCode).to.be.equal(200)
        })

    })

    // describe('Test avanzado de sesion', ()=>{
    //     let cookie
    //     it('Debe poder registrar 1 usuario correctamente', async function () {
    //         let mockUser = {
    //             first_name:'Baruch',
    //             last_name:'Prueba test',
    //             full_name: 'Baruch Prueba test',
    //             email:'Baruch@aaaaaa.com',
    //             password:'123aaa',
    //             role:'admin'
    //         }
    //         const {_body} = await requester.post('/api/sessions/register').send(mockUser)
    //     //    console.log(_body);
    //         expect(_body.status).to.be.ok
    //     })
    //     it('Debe poder loguear 1 usuario correctamente', async function () {
    //         let mockUser = {
    //             email:'Baruch@aaaaaa.com',
    //             password:'123aaa'
    //         }
    //         const {_body} = await requester.post('/api/sessions/login').send(mockUser)
    //         // const cookieResult = response.headers[ ]
    //     //    console.log(_body);
    //         expect(_body).to.be.ok
    //     })
    // })
})


//como es un endpoint tendremos varias respuestas
//statuscode ok