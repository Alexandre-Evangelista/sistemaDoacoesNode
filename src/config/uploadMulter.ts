import multer from "multer";
import crypto from "crypto"
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default {
    upload(folder: string){
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname,"..","..",folder),
                filename: (request,file, callback)=>{
                    const fileHash = crypto.randomBytes(16).toString("hex"); //Para evitar nome repetido
                    const filename = `${fileHash}-${file.originalname}`;
                    console.log("file name",filename)
                    return callback(null,filename);
                },
            }),
        };
    },
};