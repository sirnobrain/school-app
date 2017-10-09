'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: {
                args: true,
                msg: 'Validation Error: Email is already used'
              }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  });
  return User;
};