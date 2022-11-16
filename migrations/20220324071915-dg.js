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
    "dg",
    {
      idDG: { type: "int", length: 15, primaryKey: true, autoIncrement: true },
      nameDG: "string",
    },
    callback
  );
};

exports.down = function (db) {
  db.dropTable("dg");
  return null;
};

exports._meta = {
  version: 1,
};
