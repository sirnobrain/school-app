'use strict';

const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: {
                args: true,
                msg: 'Validation Error: Username is already used'
              }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt: {
      type: DataTypes.STRING,
      validate: {
        isUnique: function(value, next) {
          const condition = {
              where: {salt: value, id: {[sequelize.Op.notIn]: [this.id]}}
          }

          User.findOne(condition)
          .then(user => {
              if(user) next(err);
              next();
          });
        }
      }
    }
  });


  User.beforeCreate(User => {
    const hash = crypto.createHmac('sha256', User.salt)
                        .update(User.password)
                        .digest('hex');
    User.password = hash;
  });

  return User;
};