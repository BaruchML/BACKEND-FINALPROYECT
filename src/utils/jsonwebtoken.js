import jwt from "jsonwebtoken"
import { configObject } from "../config/config.js"

//esta llave es como cuando firmabamos sessions o cookies que es para que en caso de que se rompa el token pueda detectar si es 1 token que yo firme 
const { jwt_secret_key } = configObject

//pasamos todos los datos que queramos que tenga el objeto (id,role,mail)

const generateToken = user => jwt.sign(user, jwt_secret_key, { expiresIn: '24h' }) //ESTAMOS HACIENDO LA MISMA FUCNION QUE SE COMENTA ABAJO, PERO DE UNA MANERA CON BUENAS PRACTICAS

// const generateToken = (user)=>{             //podemos agregar fecha de expiracion
//     const token = jwt.sign(user, private_key,{expiresIn: '24h'})
//     return token
// }

//-------------------------------------------------------------
export const authTokenMiddleware = (req, res, next) => {     //configurar la informacion que nos envia por cabecera el cliente
    const authHeader = req.headers['authorization']
    if (!authHeader) return res.status(401).send({ status: 'error', message: 'No authenticate' }) //'No token'
    //{'authorization': 'BEABER sakdjakjkalqoweqjekqwjlda'}

    const token = authHeader.split('')[1] //con esto tomamos  el token del array , pues se encuentra en esa posicion
    jwt.verify(token, jwt_secret_key, (error, decodeUser) => {
        if (error) return res.status(401).send({ status: 'error', message: 'No authorizated' })

        req.user = decodeUser //en decodeUser vienen todos los datos 
        next()
    })
}


export default generateToken