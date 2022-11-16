const connect = require("../config/db");
const util = require("util");

const Dg = (dg) => {
  this.idDG = dg.idDG;
  this.nameDG = dg.nameDG;
  this.idInternshipCourse = dg.idInternshipCourse;
};

Dg.getList = async (condition) => {
  try {
    const listColumn = "*";
    const where = buildWhere(condition);
    const strSql = `SELECT ${listColumn} FROM dg WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};

Dg.create = async (condition) => {
  try {
    const sql = `INSERT INTO dg SET ? `;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};

Dg.update = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `UPDATE dg SET ? WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};

Dg.remove = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `DELETE FROM dg WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const buildWhere = (condition) => {
  let strWhere = "1=1";

  if (condition.idDG) {
    strWhere += " AND idDG = " + condition.idDG;
  }
  if (condition.idInternshipCourse) {
    strWhere += " AND idInternshipCourse = " + condition.idInternshipCourse;
  }

  return strWhere;
};
Dg.ErrorSpecialChars ="Không được nhập kí tự đặc biệt"
Dg.ErrorRequest = "Bạn cần nhập đầy đủ thông ";
Dg.ErrorName = "Tên DG không đủ chiều dài";
Dg.SuccessMessage = "Cập nhật thành công";
Dg.FailureMessage = "Cập nhật thất bại";
Dg.SuccessDelete = "Xóa thành công";
Dg.FailureDelete = "Xóa thất bại";
Dg.SuccessAdd = "Thêm thành công";
Dg.FailureAdd = "Thêm thất bại";

module.exports = Dg;
