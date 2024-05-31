
import { fileURLToPath } from "url";
import path from "path";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default __dirname;



//multer para foto de perfil
const profileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/public/images`);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

export const profileUpload = multer({ storage: profileStorage });
//multer para documents
const documentsStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/public/docUsers`);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


export const documentsUpload = multer({ storage: documentsStorage });