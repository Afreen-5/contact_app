const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case 400:
            res.json({
                title: "Bad Request",
                message: err.message,
                stackTrace: err.stack
            })
        break;
        case 404:
            res.json({
                title: "Not found",
                message: err.message,
                stackTrace: err.stack
            });
        break;
        case 406:
            res.json({
                title: "Not acceptable",
                message: err.message,
                stackTrace: err.stack
            });
        break;
        case 500:
            res.json({
                title: "Internal Server Error",
                message: err.message,
                stackTrace: err.stack
            });
        break;
    
        default:
        break;
    }
}
module.exports = errorHandler;