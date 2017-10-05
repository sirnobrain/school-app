'use strict';
module.exports = (sequelize, DataTypes) => {
    var Student = sequelize.define('Student', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Validation Error: Email format is incorrect'
                }
            },
            unique: {
                args: true,
                msg: 'Validation Error: Email is lalala'
            }
        }
    }, 
    {
    classMethods: {
        associate: function(models) {
        // associations can be defined here
        }
    }
    });

    Student.prototype.getFullName = function() {
        return this.first_name + ' ' + this.last_name;
    }

  return Student;
};