import { Router } from "express";
import { fork } from "child_process"
import { sendMail } from "../utils/sendEmail.js";
import { faker } from "@faker-js/faker"
import compression from "express-compression";



const router = Router()



router.get('/logger', (req, res) => {
    req.logger.warning('warning ejecutandose');
    // req.logger.error('error ejecutandose')
    res.send('logger ejecutado')
})

router.get('/simple', (req, res) => {
    let sum = 0
    for (let i = 0; i < 1000000; i++) {
        sum += i
    }
    res.send(`La suma es${summ}`)
})

router.get('/compleja', (req, res) => {
    let sum = 0
    for (let i = 0; i < 5e8; i++) {
        sum += i
    }
    res.send(`La suma es${summ}`)
})







//brotli--------------------
// router.use(compression({
//     brotli:{
//         enabled: true,
//         zlib:{}
//     }
// }))
// router.get('/stringlargo',(req,res)=>{
//     let string = 'Hola esto es un string ridiculamente largo'
//     for (let i = 0; i < 1000000; i++) {
//         string += 'Hola esto es un string ridiculamente largo'

//     }
//     res.send(string)
// })
// -----------------------------------------------

//FAKER--------------------------------------------
// const generateProducts = () =>{
//     return {
//         title:faker.commerce.productName(),
//         price:faker.commerce.price(),
//         department:faker.commerce.department(),
//         stock:parseInt(faker.string.numeric()),
//         description: faker.commerce.productDescription(),
//         id:faker.database.mongodbObjectId(),
//         img:faker.image.url()
//     }
// } 
// const generateUser = ()=>{
//     let numberOfProducts = parseInt(faker.string.numeric(1,{bannedDigits:['0']}))
//     let products = []

//     for (let i = 0; i < numberOfProducts; i++) {
//         products.push(generateProducts());
//     }
//     return {
//         id:faker.database.mongodbObjectId(),
//         first_name:faker.person.firstName(),
//         last_name:faker.person.lastName(),
//         sex: faker.person.sex(),
//         birthDate:faker.date.birthdate(),
//         phone:faker.phone.number(),
//         image:faker.image.avatar(),
//         email:faker.internet.email(),
//         products
//     }
// }
// router.get('/users', (req,res)=>{
//     let users = []
//     for (let i = 0; i < 100; i++) {
//         users.push(generateUser())
//     }
//     res.send({
//         status: '',
//         payload:users
//     })
// })
// --------------------------------------------------------------------------------------


//MAIL
// router.get('/mail', (req, res) => {
//     const destinatario = 'super.javier.101.@gmail.com'
//     const subject = 'Email de prueba coder'
//     const html = '<div><h1>Este es un mail de prueba</h1></div>'

//     sendMail(destinatario,subject,html)
//     res.send('Email enviado')
// })

//SMS
// router.get('/sms', (req, res) => {

//     sendSms('Baruch','Mendivil')
//     res.send('sms enviado')
// })
// -----------------------------------------------------------------------------------------

export default router