import { scrypt, randomBytes } from "crypto"; 
import { promisify } from "util"

const scryptAsync = promisify(scrypt); 

export class Password {
    // hashes a password string. 
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex'); 
        const buff = (await scryptAsync(password, salt, 64)) as Buffer; 

        return `${buff.toString('hex')}.${salt}`; 
    }

    // checks if supplied password's hash is the same as stored password hash. 
    static async compare(storedPassword: string, suppliedPassword: string){
        const [hashedPassword, salt] = storedPassword.split("."); 
        const buff = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer; 

        return buff.toString('hex') === hashedPassword; 
    }
}