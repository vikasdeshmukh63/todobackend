const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// hashing password 
const hashPassword = async(password)=>{
    try {
        const saltRounds = 10;
       const finalPassword =  await bcrypt.hash(password,saltRounds);
       return finalPassword
    } catch (error) {
        console.log(error)
    }
}


// comparing password with hash password 
const comparePassword = async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}


// generating token
const tokenGenerator= (userId,jwtSrecret,expTime)=>{
    const token = JWT.sign(
        { _id: userId },
        jwtSrecret,
        { expiresIn: expTime }
    );

    return token 
}

module.exports = {
    hashPassword,
    comparePassword,
    tokenGenerator
}
