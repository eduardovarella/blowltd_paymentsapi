'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Payments', require('../initial_data/transactions.json').data.map(transaction => { 
      transaction.attributes = JSON.stringify(transaction.attributes);
      return transaction; 
    }), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Payments', null, {});
  }
};
