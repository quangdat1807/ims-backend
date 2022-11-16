"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable(
    "internship",
    {
      idInternship: {
        type: "int",
        length: 15,
        primaryKey: true,
        autoIncrement: true,
      },
      fullNameInternship: "string",
      address: "string",
      university: "string",
      email: "string",
      idMentor: {
        type: "int",
        length: 15,
        foreignKey: {
          name: "pk_internship_mentor",
          table: "mentor",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
          mapping: {
            idMentor: "idMentor",
          },
        },
      },

      internshipProject: "string",
      telInternship: { type: "string", length: 10 },
      securityTest: "string",
      idInternshipCourse: {
        type: "int",
        length: 15,
        foreignKey: {
          name: "pk_internship_internshipcourse",
          table: "internshipcourse",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
          mapping: {
            idInternshipCourse: "idInternshipCourse",
          },
        },
      },
      idDG: {
        type: "int",
        length: 15,
        foreignKey: {
          name: "pk_internship_dg",
          table: "dg",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
          mapping: {
            idDG: "idDG",
          },
        },
      },
      idCandidate: {
        type: "int",
        length: 15,
        foreignKey: {
          name: "pk_internship_candidate",
          table: "candidates",
          rules: {
            onDelete: "CASCADE",
            onUpdate: "RESTRICT",
          },
          mapping: {
            idCandidate: "idCandidate",
          },
        },
      },
      internshipAgreementPolicy: "string",
      toeicScore: { type: "int", length: "15" },
      testDate: "date",
      securityAwareness: "string",
      pmtoolsAgileMethodology: "string",
      workEtiquetteProfessionalCommunication: "string",
      presentationSkills: "string",
      trainingAttendance: "string",
      status: "string",
      remark: "string",
      pcType: "string",
      internshipSchedule: "string",
      covidVaccinationiInformation: "string",
      certificationDate: { type: "date" },
      internshipDomain: "string",
    },
    callback
  );
};

exports.down = function (db) {
  db.dropTable("internship");
  return null;
};

exports._meta = {
  version: 1,
};
