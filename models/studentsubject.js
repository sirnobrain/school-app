'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  });

  StudentSubject.associate = function(models) {
    // one to many with Student
    StudentSubject.belongsTo(models.Student, {onDelete: 'cascade'});
    // one to many with Subject
    StudentSubject.belongsTo(models.Subject, {onDelete: 'cascade'});
  }

  return StudentSubject;
};