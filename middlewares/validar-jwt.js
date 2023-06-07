const { response } = require("express");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


const validarJWT = (req,res = response, next) =>{
    
    const token = req.header('x-token')
    try {
        const payload = jwt.verify(token,process.env.SECRET_JWT)
        req.uid = payload.uid
        req.name = payload.name
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok:false,
            msg: 'mal'
        })
    }
    next()

}
module.exports = {
    validarJWT
}