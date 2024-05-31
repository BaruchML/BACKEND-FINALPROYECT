import passport from "passport";
import loggerWinston from "../utils/logger.js";

//passportCall recibe y ejecuta nuetra estrategia
//passportCall es reconfigurar la funcion de passport.authenticate
export const passportCall = strategy => {
    //retorna una funcion que actua como middleware
    return async (req,res,next) => {        
        passport.authenticate(strategy,function (err,user,info){
            loggerWinston.info(user)
            if(err) return next(err)                                    //ternario
            if(!user) return res.status(401).send({status:'error', error: info.message ? info.message : info.toString() })
            req.user = user //esto antes lo hacia automaticamente pero debemos de hacerlo ahora nosotros
            next()
        })
        (req,res,next) //se los pasamos nuevamente para que se autoejecute la funcion 

    }
}