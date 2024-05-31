import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { authorization } from "../middleware/authorization.middleware.js";
import { profileUpload, documentsUpload } from "../utils.js";
import { passportCall } from "../middleware/passportCall.js";

const router = Router()
const {
    getUser,
    getUsers,
    createUser,
    updateUserToPremium,
    deleteUser,
    getUsersPremium,
    getDocuments,
    profileImg,
    documentsUser
} = new UserController()
router
    .get('/', authorization(['PUBLIC']), getUsers)
    .get('/:uid', authorization(['PUBLIC']), getUser)
    .post('/', authorization(['PUBLIC']), createUser)
    .put('/:cid/premium', authorization(['PUBLIC']), updateUserToPremium)
    .delete('/:uid', authorization(['PUBLIC']), deleteUser)
    .get('/premium', authorization(['PUBLIC']), getUsersPremium)
    .post('/:uid/documents', authorization(['PUBLIC']), getDocuments)
    .post('/profileimg', passportCall('jwt'), authorization(['USER', 'ADMIN']), profileUpload.single('profileImg'), profileImg)
    .post('/documentsuser', passportCall('jwt'), authorization(['USER', 'ADMIN']), documentsUpload.array('documentsFiles', 3), documentsUser)
export default router 