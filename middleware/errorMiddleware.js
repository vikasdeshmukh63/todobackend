const customErrorHandler = require("../helpers/customErrorHandler")

const errorMiddleware = (err,req,res,next)=>{
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    return res.status(err.statusCode).send({
        message:err.message,
        success:false
    });

}

module.exports = errorMiddleware;