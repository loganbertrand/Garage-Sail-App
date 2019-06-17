module.exports = function(sequelize, DataTypes) {
  var GarageSale = sequelize.define('GarageSale', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    time: DataTypes.STRING,
    categories: DataTypes.STRING,
    image: DataTypes.STRING
  });
  return GarageSale;
};
