'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  });

  Subject.associate = function(models) {
    // one to many with Teacher
    Subject.hasMany(models.Teacher);
    // many to many with Student
    Subject.belongsToMany(models.Student, {through: 'StudentSubject'});
    // one to many with StudentSubject
    Subject.hasMany(models.StudentSubject);
  }

  return Subject;
};