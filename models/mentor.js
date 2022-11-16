const connect = require("../config/db");
const util = require("util");

const Mentor = (mentor) => {
  this.idMentor = mentor.idMentor;
  this.fullNameMentor = mentor.fullName;
  this.dayOfBirth = mentor.dayOfBirth;
  this.address = mentor.address;
  this.workplace = mentor.workplace;
  this.email = mentor.email;
  this.position = mentor.position;
  this.idDG = mentor.idDG;
  this.idInternshipCourse = mentor.idInternshipCourse;
};

Mentor.get = async (condition, columns, page, limit) => {
  try {
    const where = buildWhere(condition);
    // let listColumn = "*";
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }

    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }

    const strSql = `SELECT ${listColumn} FROM mentor ${inner} WHERE ${where} LIMIT ${limit} OFFSET ${offset}`;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};
Mentor.getdiddg = async (condition, columns, page, limit) => {
  try {
    const where = buildWhere(condition);
    let listColumn = "*";
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }

    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }

    const strSql = `SELECT ${listColumn} FROM mentor WHERE ${where} LIMIT ${limit} OFFSET ${offset}`;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};


Mentor.getTotalCount = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `SELECT count(*) as totalCount FROM mentor WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result[0].totalCount;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

const buildWhere = (condition) => {
  let strWhere = "1=1";

  if (condition.mentorId) {
    strWhere += " AND idMentor = " + condition.mentorId;
  }
  if (condition.idDGs) {
    strWhere += " AND mentor.idDG = " + condition.idDGs;
  }
  if (condition.idMentor) {
    strWhere += " AND idMentor = " + condition.idMentor;
  }

  if (condition.emailMentor) {
    strWhere += ' AND mentor.email = "' + condition.emailMentor + '"';
  }
  if (condition.idInternshipCourse) {
    strWhere +=
      ' AND mentor.idInternshipCourse = "' + condition.idInternshipCourse + '"';
  }
  if (condition.internshipcourseId) {
    strWhere +=
      " AND mentor.idInternshipCourse  = " + condition.internshipcourseId;
  }

  return strWhere;
};
Mentor.getdetailBatch = async (condition, columns, page, limit) => {
    let listColumn = "*";

  try {
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }

    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }
    const where = buildWhere(condition);

    const strSql = `SELECT ${listColumn} FROM mentor ${inner}  WHERE ${where}  ORDER BY idMentor DESC  LIMIT ${limit} OFFSET ${offset} `;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};

const inner = ` INNER JOIN internshipcourse
INNER JOIN dg 
ON mentor.idInternshipCourse = internshipcourse.idInternshipCourse 
AND mentor.idDG = dg.idDG`;
const listColumn = `mentor.idMentor,
mentor.fullNameMentor,
mentor.dayOfBirth,
mentor.workplace,
mentor.email,
mentor.address,
mentor.position,
dg.nameDG,
internshipCourse.nameCoure `;

Mentor.remove = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `DELETE FROM mentor WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

Mentor.create = async (condition) => {
  try {
    const sql = `INSERT INTO mentor SET ?`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};

Mentor.update = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `UPDATE mentor SET ? WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};

Mentor.ERROR_EMPTY = "Vui lòng điền đầy đủ thông tin !";
Mentor.ERROR_SPECIAL_CHARACTERISTICS =
  "Vui lòng tên của bạn không dùng ký tự đặc biệt !!!!";
Mentor.ERROR_LENGHT = "Vui lòng nhập thông tin trong khoảng 2 -> 255 kí tự !!!";
Mentor.ERROR_DATE = " Ngày sinh không hợp lệ phải lớn hơn 01/01/1960 !!!";
Mentor.ERROR_EMAIL = "Email không hợp lệ !!!";
Mentor.MESSAGE_CREATE = "Thêm thành công !!!";
Mentor.MESSAGE_UPDATE = "Cập nhật thành công !!!";
Mentor.ERROR_CREATE = "idDG hoặc idInternshipCourse không tồn tại !!!";
Mentor.ERROR_UPDATE = "ID người hướng dẫn không tồn tại";
Mentor.ERROR_DATENOW = "Ngày sinh không được lớn hơn ngày hiện tại !!!";
Mentor.MESSAGE_DELETE = "Xóa thành công !!!";
Mentor.ERROR_DELETE = " ID người hướng dẫn không tồn tại";
Mentor.ERROR_EMAIL_DUPLICATE = "Email người hướng dẫn đã tồn tại";
module.exports = Mentor;
