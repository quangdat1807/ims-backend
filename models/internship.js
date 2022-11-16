const connect = require("../config/db");
const util = require("util");

const Internship = (internship) => {
  this.idInternship = internship.idInternship;
  this.fullNameInternship = internship.fullNameInternship;
  this.address = internship.address;
  this.university = internship.university;
  this.email = internship.email;
  this.idMentor = internship.idMentor;
  this.internshipProject = internship.internshipProject;
  this.tel = internship.tel;
  this.securityTest = internship.securityTest;
  this.idInternshipCourse = internship.idInternshipCourse;
  this.InternshipAgreementPolicy = internship.internshipAgreementPolicy;
  this.ToeicScore = internship.ToeicScore;
  this.testDate;
  this.securityAwareness = internship.securityAwareness;
  this.pmtoolsAgileMethodology = internship.pmtoolsAgileMethodology;
  this.workEtiquetteProfessionalCommunication =
    internship.workEtiquetteProfessionalCommunication;
  this.presentationSkills = internship.presentationSkills;
  this.trainingAttendance = internship.trainingAttendance;
  this.status = internship.status;
  this.remark = internship.remark;
  this.pcType = internship.pcType;
  this.internshipSchedule = internship.internshipSchedule;
  this.covidVaccinationiInformation = internship.covidVaccinationiInformation;
  this.certificationDate = internship.certificationDate;
  this.internshipDomain = internship.internshipDomain;
  this.internshipStatus = internship.internshipStatus
};
const listColumn = `
internship.idInternship,  
internship.fullNameInternship,
internship.address,
internship.university,
internship.email,
internship.telInternship,
internship.internshipProject,
internship.internshipAgreementPolicy, 
internship.securityTest,
internship.toeicScore,
internship.testDate,
internship.securityAwareness, 
internship.pmtoolsAgileMethodology, 
internship.workEtiquetteProfessionalCommunication,
internship.presentationSkills, 
internship.trainingAttendance,
internship.status,
internship.remark,
internship.pcType,
internship.internshipSchedule,
internship.covidVaccinationiInformation,
internship.certificationDate,
internship.internshipDomain,
internship.idDG,
internship.trainingAttendance,
internship.internshipStatus,
dg.nameDG,
mentor.fullNameMentor,
mentor.idMentor,
internshipcourse.dateStart,
internshipcourse.dateEnd,
internshipcourse.nameCoure
  `;

const inner = `INNER JOIN internshipcourse
INNER JOIN mentor
INNER JOIN dg 
ON internship.idInternshipCourse = internshipcourse.idInternshipCourse 
AND internship.idMentor = mentor.idMentor
AND internship.idDG = dg.idDG 
`;
Internship.get = async (condition, columns, page, limit) => {
  try {
    const where = buildWhere(condition);
    // const listColumn = "*";
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }

    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }

    const strSql = `SELECT ${listColumn}FROM internship ${inner} WHERE ${where} LIMIT ${limit} OFFSET ${offset}`;

    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};

Internship.getTotalCount = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `SELECT count(*) as totalCount FROM internship WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result[0].totalCount;
    
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

Internship.create = async (condition) => {
  try {
    const where = buildWhere(condition);
    const listSelect = `candidates.fullName, 
    candidates.tel, 
    candidates.idInternshipCourse, 
    candidates.idCandidate, 
    candidates.idMentor,
     candidates.idDG, 
     candidates.university,
     candidates.status,
     candidates.remark,
     candidates.pcType,
     candidates.internshipSchedule,
     candidates.covidVaccinationiInformation,
     candidates.certificationDate,
     candidates.internshipDomain, 
     candidates.emailCandidate
     `;
    const listColumn = `(internship.fullNameInternship, 
      internship.telInternship, 
      internship.idInternshipCourse, 
      internship.idCandidate, 
      internship.idMentor, 
      internship.idDG, internship.university, 
      internship.status,
      internship.remark,
      internship.pcType,
      internship.internshipSchedule,
      internship.covidVaccinationiInformation,
      internship.certificationDate,
      internship.internshipDomain,
      internship.email) `;
    const sql = `INSERT INTO internship ${listColumn} SELECT ${listSelect}
      FROM candidates WHERE candidates.status = "Pass" AND candidates.updateInsert = "success"  AND ${where} `;
    const query = util.promisify(connect.query).bind(connect);
    return await query(sql);
  } catch (err) {
    console.log(err);
  }
};

Internship.getdetailBatch = async (condition, columns, page, limit) => {
  try {
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }

    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }
    const where = buildWhere(condition);

    const strSql = `SELECT ${listColumn} FROM internship ${inner} WHERE ${where} LIMIT ${limit} OFFSET ${offset} `;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};

Internship.remove = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `DELETE FROM internship WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
Internship.update = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `UPDATE internship SET ? WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};
Internship.updateStatus = async (condition) => {
  try {
    const sql = `UPDATE internship SET ? WHERE internshipStatus != "Dừng thực tập"`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};
Internship.createInternship = async (condition) => {
  try {
    const sql = `INSERT INTO internship SET ?`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};
const buildWhere = (condition) => {
  let strWhere = "1=1";

  if (condition.idInternship) {
    strWhere += " AND idInternship  = " + condition.idInternship;
  }
  if (condition.idInternshipCourse) {
    strWhere +=
      " AND candidates.idInternshipCourse  = " + condition.idInternshipCourse;
  }
  if (condition.idInternshipCourses) {
    strWhere +=
      " AND internship.idInternshipCourse  = " + condition.idInternshipCourses;
  }
  if (condition.idInternshipcourse) {
    strWhere +=
      " AND internshipcourse.idInternshipCourse  = " +
      condition.idInternshipcourse;
  }
  if (condition.emailInternship) {
    strWhere += ' AND internship.email = "' + condition.emailInternship + '"';
  }
  return strWhere;
};

Internship.ERROR_SPECIAL_CHARACTERISTICS =
  "Vui lòng tên của bạn không dùng ký tự đặc biệt !!!!";
Internship.ERROR_LENGHT =
  "Vui lòng nhập thông tin trong khoảng 2 -> 255 kí tự!!!";
Internship.ERROR_DATE = " Ngày sinh không hợp lệ phải lớn hơn 01/01/1960 !!!";
Internship.ERROR_EMAIL = "Email không hợp lệ !!!";
Internship.MESSAGE_CREATE = "Thêm thành công !!!";
Internship.MESSAGE_UPDATE = "Cập nhật thành công !!!";
Internship.ERROR_CREATE = "DG hoặc khóa thực tập không tồn tại !!!";
Internship.ERROR_UPDATE = "Thực tập sinh không tồn tại";
Internship.ERROR_DATENOW = "Ngày sinh không được lớn hơn ngày hiện tại !!!";
Internship.ERROR_DATETEST = "Ngày kiểm tra không được lớn hơn ngày hiện tại !!!";
Internship.ERROR_DATECER =
  "Ngày chứng nhận không được lớn hơn ngày hiện tại !!!";
Internship.ERROR_EMPTY = "Vui lòng điền đẩy đủ thông tin !!!";
Internship.MESSAGE_DELETE = "Xóa thành công !!!";
Internship.ERROR_DELETE = " Thực tập sinh không tồn tại";
Internship.MESSAGE_UPDATE = "Cập nhật thành công !!!";
Internship.MESSAGE_CREATE = "Thêm thành công !!!";
Internship.ERROR_CREATE = "Thêm thất bại !!!";
Internship.ERROR_TOEIC = "Điểm toeic nhập vào không hợp lệ !!!";
Internship.ERROR_SECURITY = "Điểm bảo mật thông tin nhập vào không hợp lệ !!!";
Internship.ERROR_TEL = "Số điện thoại không hợp lệ !!!";
Internship.ERROR_EMAIL_DUPLICATE = "Email thực tập sinh đã tồn tại";
module.exports = Internship;
