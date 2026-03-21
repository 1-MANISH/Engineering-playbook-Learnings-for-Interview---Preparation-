function sendSuccess(res,statusCode,data={},message=null){
        return res.status(statusCode).json({
                success:true,
                message,
                data
        })
}

function sendError(res,statusCode,message=null){
        return res.status(statusCode).json({
                success:false,
                message
        })
}

export {
        sendSuccess,
        sendError
}