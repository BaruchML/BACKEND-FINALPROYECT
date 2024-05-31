import { Router } from 'express'
import viewsRouter from './views.router.js'
import cartsRouter from "./carts.router.js"
import productsRotuer from "./products.router.js"
import usersRouter from "./users.router.js"
import sessionsRouter from "./sessions.router.js"
import pruebasRouter from "./pruebas.router.js"
import ticketRouter from "./ticket.router.js"


const router = Router()

router.use('/', viewsRouter)
router.use('/api/users', usersRouter)
router.use('/api/sessions', sessionsRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/products', productsRotuer)
router.use('/api/tickets', ticketRouter)



//comodin de las rutas que usen get y un endpoint no definido
router.get('*', (req, res) => {
    res.send('not found')
})



export default router