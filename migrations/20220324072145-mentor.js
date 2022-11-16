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
    "mentor",
    {
      idMentor: {
        type: "int",
        length: 15,
        primaryKey: true,
        autoIncrement: true,
      },
      fullNameMentor: "string",
      dayOfBirth: { type: "date" },
      address: "string",
      workplace: "string",
      email: "string",
      position: "string",
      idDG: {
        type: "int",
        length: 15,
        foreignKey: {
          name: "pk_mentor_dg",
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
      idInternshipCourse: {
        type: "int",
        length: 15,
        foreignKey: {
          name: "pk_mentor_internshipcourse",
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
    },
    callback
  );
};

exports.down = function (db) {
  db.dropTable("mentor");
  return null;
};

exports._meta = {
  version: 1,
};
