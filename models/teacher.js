'use strict';
const fullname = require('./../helpers/fullname');

module.exports = (sequelize, DataTypes) => {
    var Teacher = sequelize.define('Teacher', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Validation Error: Email format is incorrect'
                },
                isUnique: function(value, next) {
                    const condition = {
                        where: {email: value, id: {[sequelize.Op.notIn]: [this.id]}}
                    }
                    
                    const error = {
                        message: 'Validation Error: Email is already used'
                    }
                    Teacher.find(condition)
                    .then(teacher => {
                        if(teacher) next(error)
                        next();
                    });
                }
            }
        },
        SubjectId: DataTypes.INTEGER
    });

    Teacher.associate = function(models) {
        Teacher.belongsTo(models.Subject, {onDelete: 'SET NULL', });
    }

    Teacher.prototype.getFullName = function() {
        return fullname(this.first_name, this.last_name);
    }

    return Teacher;
};