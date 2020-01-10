const APIGatewayUtils = require('../utils/api-gateway');
const PaymentsService = require('../services/payments');

module.exports.list = async (event) => {

    try {
        const data = await PaymentsService.list();
        return APIGatewayUtils.buildSuccessResponse(data);
    }
    catch (error) {
        console.log(error);
        return APIGatewayUtils.buildErrorResponse(500, error.toString());
    }
};

module.exports.get = async (event) => {

    try {
        const paymentId = event.pathParameters.paymentId;
        const data = await PaymentsService.get(paymentId);
        return data ? APIGatewayUtils.buildSuccessResponse(data) : APIGatewayUtils.buildErrorResponse(404, "Payment not found");
    }
    catch (error) {
        console.log(error);
        return APIGatewayUtils.buildErrorResponse(500, error.toString());
    }
};

module.exports.create = async (event) => {

    try {
        const paymentPayload = JSON.parse(event.body);
        const data = await PaymentsService.create(paymentPayload);
        return APIGatewayUtils.buildSuccessResponse(data);
    }
    catch (error) {
        console.log(error);
        if (error.name && error.name === "SequelizeValidationError") {
            return APIGatewayUtils.buildErrorResponse(400, error.toString());
        }
        else {
            return APIGatewayUtils.buildErrorResponse(500, error.toString());
        }
    }
};

module.exports.update = async (event) => {

    try {
        const paymentId = event.pathParameters.paymentId;
        const paymentPayload = JSON.parse(event.body);
        const data = await PaymentsService.update(paymentId, paymentPayload);
        return APIGatewayUtils.buildSuccessResponse(data);
    }
    catch (error) {
        console.log(error);
        if (error.name && error.name === "SequelizeValidationError") {
            return APIGatewayUtils.buildErrorResponse(400, error.toString());
        }
        else {
            return APIGatewayUtils.buildErrorResponse(500, error.toString());
        }
    }
};

module.exports.delete = async (event) => {

    try {
        const paymentId = event.pathParameters.paymentId;
        const data = await PaymentsService.delete(paymentId);
        return APIGatewayUtils.buildSuccessResponse(data);
    }
    catch (error) {
        console.log(error);
        return APIGatewayUtils.buildErrorResponse(500, error.toString());
    }
};