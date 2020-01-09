const buildResponse = (code, messageString) => {
    return {
        "statusCode": code,
        "headers": {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
        },
        "body": messageString,
        "isBase64Encoded": false
    };
}

module.exports.buildSuccessResponse  = (data) => {
    return buildResponse(200, JSON.stringify(data))
}

module.exports.buildErrorResponse  = (code, error) => {
    return buildResponse(code, JSON.stringify(error))
}