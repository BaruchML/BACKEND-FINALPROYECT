import { Router } from 'express'
import { TicketController } from '../controllers/ticket.controller.js'
import { authorization } from "../middleware/authorization.middleware.js";
import { passportCall } from '../middleware/passportCall.js';

const router = Router()
const {
    getTicket,
    getTicketBy,
    createTicket,
    updateTicket,
    deleteTicket,
    ticketPost } = new TicketController()
router
    .get('/', passportCall('jwt'), authorization(['ADMIN']), getTicket)
    .get('/:tid', passportCall('jwt'), authorization(['ADMIN']), getTicketBy)
    .post('/', authorization(['PUBLIC']), createTicket)
    .put('/:tid/:pid', authorization(['PUBLIC']), updateTicket)
    .post('/:cid/purchase', passportCall('jwt'), authorization(['USER']), ticketPost)
    .delete('/:tid', authorization(['PUBLIC']), deleteTicket)

export default router