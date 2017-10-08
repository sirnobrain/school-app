'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('StudentSubjects', ['SubjectId'], {
      type: 'FOREIGN KEY',
      name: 'studentsubjects_subjects_fk',
      references: { //Required field
        table: 'Subjects',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('StudentSubjects', 'studentsubjects_subjects_fk');
  }
};
