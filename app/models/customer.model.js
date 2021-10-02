module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    name: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.INTEGER
    },
    birthdate: {
      type: Sequelize.DATE
    },
    id_type: {
      type: Sequelize.STRING
    },
    id_number: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    detail_address: {
      type: Sequelize.STRING
    },
    lat: {
      type: Sequelize.STRING
    },
    long: {
      type: Sequelize.STRING
    },
    instagram: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.INTEGER
    },
  }, {
    freezeTableName: true,
    paranoid: true,
  });

  return Customer;
};
