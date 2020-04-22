exports.success = function (req: any, res: any, message: String, status: Number) {
    res.status(status || 200).send(message);
}

exports.error = function (req: any, res: any, message: String, status: Number, details: String) {
    console.error('[response error] ' + details);

    res.status(status || 500).send({ 
        error: message,
        body: '',
    });
}