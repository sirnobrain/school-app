'use strict';
const fullname = require('./../helpers/fullname');

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
                msg: 'Validation Error: Email is already used'
            }
        }
    });

    Student.associate = function(models) {
        // many to many with Subject
        Student.belongsToMany(models.Subject, {through: 'StudentSubject'});
        // one to many with StudentSubject
        Student.hasMany(models.StudentSubject);
    }
    
    Student.prototype.getFullName = function() {
        return fullname(this.first_name, this.last_name);
    }

  return Student;
};