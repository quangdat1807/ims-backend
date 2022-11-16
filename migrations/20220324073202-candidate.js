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
    "candidates",
    {
      idCandidate: {
        type: "int",
        length: 15,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: "string",
      tel: { type: "string", length: 10 },
      emailCandidate: "string",
      idDG: {
        type: "int",
        length: 15,
        foreignKey: {
          name: "pk_candidate_dg",
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
      interviewTime: { type: "time" },
      interviewDate: { type: "date" },
      status: "string",
      remark: "string",
      idMentor: {
        type: "int",
        length: 15,
        foreignKey: {
          name: "pk_candidate_mentor",
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
      technicalComments: "string",
      technicalScore: "string",
      attitude: "string",
      englishCommunication: "string",
      comments: "string",
      remarks: "string",
      internshipDomain: "string",
      preferredSkills: "string",
      university: "string",
      faculty: "string",
      currentYearofStudy: "string",
      studentID: "string",
      preferredInternshipStartDate: "date",
      preferredInternshipDuration: "string",
      internshipSchedule: "string",
      GPA: { type: "float", length: 15 },
      idInternshipCourse: {
        type: "int",
        length: 15,
        foreignKey: {
          name: "pk_candidate_internshipcouse",
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
      graduationYear: "string",
      projectExperience: "string",
      expectedGraduationSchedule: "string",
      remainingSubjects: "string",
      covidVaccinationiInformation: "string",
      certificationDate: { type: "date" },
      covidVaccinationCertificate: "string",
      interviewLink: "string",
      interviewer: "string",
      emailInterviewer: { type: "string" },
      pcType: "string",
      updateInsert: "string",
      deleteAt: { type: "datetime" },
      createdAt: "datetime",
      updatedAt: "datetime",
    },
    callback
  );
};

exports.down = function (db) {
  db.dropTable("candidates");
  return null;
};

exports._meta = {
  version: 1,
};
