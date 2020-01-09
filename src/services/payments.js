module.exports.list = async () => {

    try {
        return [];
    }
    catch (error) {
        throw error
    }
};

module.exports.get = async (id) => {

    try {
        return {id};
    }
    catch (error) {
        throw error;
    }
};

module.exports.create = async (payload) => {

    try {
        return payload;
    }
    catch (error) {
        throw error;
    }
};

module.exports.update = async (id, payload) => {

    try {
        return payload;
    }
    catch (error) {
        throw error;
    }
};

module.exports.delete = async (id) => {

    try {
        return id;
    }
    catch (error) {
        throw error;
    }
};