import passport from "passport";
import passportJWT from "passport-jwt"
import GithubStrategy from "passport-github2"
import usersModel from "../dao/models/users.model.js";
import { configObject } from "./config.js";
// import { createHash, isInvalidPassword } from "../utils/hashBcrypt.js";
const {jwt_secret_key} = configObject


const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt //ME SIRVE PARA EXTRAER EL JWT DE LAS COOKIE PERO NO ES UNA FUNCIO

//ESTRATEGIAS, SIEMPRE USANDO passport.use
const initializePassport = ()=>{
    //este es el metodo para extraer la cookie de token
    const cookieExtractor = req =>{
        let token = null
        if(req && req.cookies){
            token = req.cookies['cookieToken']
        }
        return token
    }


            //'Nombre', nueva Clase(ejecutamos Constructor{}, callback)
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),//desencripta el token y lo guarda en jwt_payload
        secretOrKey: jwt_secret_key //este metodo usa la palabra secreta de TOKEN


        //jwt_payload es un parametro que ya existe pero lo nombramos que nos ayudara a capturar el reultado
        //jwt_payload viene lo que decodifique y extraiga del token, aca viene el usuario
    }, async (jwt_payload, done)=> {
        try {           //en donne null es error, despues va la info como segundo parametro
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    })) 
}   

export default initializePassport