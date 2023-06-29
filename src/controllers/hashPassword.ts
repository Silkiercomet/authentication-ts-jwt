import bcrypt from "bcrypt"

export const genPassword = (password : string) => {
    let saltAndHash = {salt:"",hash:""}
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, function(err,hash){
            saltAndHash = {
                salt:salt,
                hash:hash
            }
        })
    })
    return saltAndHash
}

export const verifyPassword = async (password:string, salt:string, hash:string) => {
    let isEqual = false
    bcrypt.hash(password, salt, function(err, hash2){
        isEqual = hash === hash2
    })
    return isEqual
}