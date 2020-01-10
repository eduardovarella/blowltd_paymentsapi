'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    type: DataTypes.STRING,
    id: {
      allowNull: false,
      type: DataTypes.STRING,
      primaryKey: true,
    },
    version: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    organisation_id: {
      allowNull: false,
      type: DataTypes.STRING
    },
    attributes: {
      allowNull: false,
      type: DataTypes.JSON
    }
  }, {});
  Payment.associate = function(models) {
    
  };
  return Payment;
};