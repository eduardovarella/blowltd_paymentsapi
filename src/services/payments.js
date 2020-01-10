const Payment = require('../../models').Payment;

module.exports.list = async () => {

    try {
        return await Payment.findAll();
    }
    catch (error) {
        throw error
    }
};

module.exports.get = async (id) => {

    try {
        return await Payment.findByPk(id);
    }
    catch (error) {
        throw error;
    }
};

module.exports.create = async (payload) => {

    try {
        payload.id = require('uuid/v1')();
        return await Payment.create(payload);
    }
    catch (error) {
        throw error;
    }
};

module.exports.update = async (id, payload) => {

    try {
        await Payment.update(payload, {
            where: {
                id
              }
        });
        return this.get(id);
    }
    catch (error) {
        throw error;
    }
};

module.exports.delete = async (id) => {

    try {
        return await Payment.destroy({
            where: {
              id
            }
          });
    }
    catch (error) {
        throw error;
    }
};