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
    "internshipcourse",
    {
      idInternshipCourse: {
        type: "int",
        length: "15",
        primaryKey: true,
        autoIncrement: true,
      },
      nameCoure: "string",
      dateStart: "date",
      dateEnd: "date",
      status: { type: "string" },
      kindOfInternship: { type: "string" },
    },
    callback
  );
};

exports.down = function (db) {
  db.dropTable("internshipcourse");
  return null;
};

exports._meta = {
  version: 1,
};
