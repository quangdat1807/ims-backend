const connect = require("../config/db");
const util = require("util");

const Candidate = (candidate) => {
  this.idCandidate = candidate.idCandidate;
  this.fullName = candidate.fullName;
  this.tel = candidate.tel;
  this.emailCandidate = candidate.emailCandidate;
  this.idDG = candidate.idDG;
  this.interviewTime = candidate.interviewTime;
  this.interviewDate = candidate.interviewDate;
  this.interviewer = candidate.interviewer;
  this.interviewLink = candidate.interviewLink;
  this.status = candidate.status;
  this.remark = candidate.remark;
  this.idMentor = candidate.idMentor;
  this.technicalComments = candidate.technicalComments;
  this.technicalScore = candidate.technicalScore;
  this.attitude = candidate.attitude;
  this.englishCommunication = candidate.englishCommunication;
  this.comments = candidate.comments;
  this.remarks = candidate.remarks;
  this.internshipDomain = candidate.internshipDomain;
  this.preferredSkills = candidate.preferredSkills;
  this.university = candidate.university;
  this.faculty = candidate.faculty;
  this.currentYearofStudy = candidate.currentYearofStudy;
  this.studentID = candidate.cstudentID;
  this.preferredInternshipStartDate = candidate.preferredInternshipStartDate;
  this.preferredInternshipDuration = candidate.preferredInternshipDuration;
  this.internshipSchedule = candidate.internshipSchedule;
  this.GPA = candidate.GPA;
  this.idInternshipCourse = candidate.idInternshipCourse;
  this.graduationYear = candidate.graduationYear;
  this.projectExperience = candidate.projectExperience;
  this.expectedGraduationSchedule = candidate.expectedGraduationSchedule;
  this.remainingSubjects = candidate.remainingSubjects;
  this.covidVaccinationiInformation = candidate.covidVaccinationiInformation;
  this.certificationDate = candidate.certificationDate;
  this.covidVaccinationCertificate = candidate.covidVaccinationCertificate;
  this.interviewLink = candidate.interviewLink;
  this.emailInterviewer = candidate.emailInterviewer;
  this.interviewer = candidate.interviewer;
  this.pcType = candidate.pcType;
  this.deleteAtt = candidate.deleteAtt;
};
Candidate.getByID = async (condition, columns, page, limit) => {
  try {
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }
    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }
    const where = buildWhere(condition);
    let listColumn = `*`;
    const strSql = `SELECT ${listColumn} FROM ${Table} WHERE ${where} LIMIT ${limit} OFFSET ${offset}`;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};
Candidate.getBatch = async (condition, columns, page, limit) => {
  try {
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }
    let offset = 0;
    offset = page  * limit;
    const where = buildWhere(condition);
    let listColumn = "*";
    const strSql = `SELECT  ${listColumn} FROM ${Table} 
    WHERE ${where} ORDER BY idCandidate DESC LIMIT ${limit} OFFSET ${offset}`;
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};
Candidate.getInterview = async (condition, columns, page, limit) => {
  try {
    let listColumn = `*`;
    if (columns && columns.length > 0) {
      listColumn = columns.join();
    }
    let offset = 0;
    if (page > 1) {
      offset = (page - 1) * limit;
    }
    const where = buildWhere(condition);
    const whereColumn = `interviewer != ''`;
    const strSql = `SELECT ${listColumn} FROM ${Table} WHERE ${whereColumn} AND ${where} LIMIT ${limit} OFFSET ${offset} `;
    console.log(strSql)
    const query = util.promisify(connect.query).bind(connect);
    return await query(strSql);
  } catch (err) {
    console.log(err);
  }
};
Candidate.getTotalCountCandidate = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `SELECT count(*) as totalCount FROM ${Table} WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result[0].totalCount;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};
Candidate.getTotalCount = async (condition) => {
  try {
    const where = buildWhere(condition);
    const whereColumn = `interviewer != ''`;
    const strSql = `SELECT count(*) as totalCount FROM ${Table} WHERE ${whereColumn} AND ${where}`;
    console.log(strSql)
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(strSql);
    return result[0].totalCount;
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

Candidate.create = async (condition) => {
  try {
    const sql = `INSERT INTO ${Table} SET ?`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};

Candidate.delete = async (condition) => {
  try {
    const valueNull = "null";
    const setColum = `interviewDate = ${valueNull}, interviewTime = ${valueNull}, interviewer = ${valueNull}, interviewLink = ${valueNull}, emailInterviewer = ${valueNull}, updateInsert = ${valueNull}`;
    const where = buildWhere(condition);
    const sql = `UPDATE ${Table} SET ${setColum} WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
Candidate.remove = async (condition) => {
  try {
    const where = buildWhere(condition);
    const sql = `DELETE FROM ${Table} WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql);
    return result.affectedRows !== 0;

  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

Candidate.update = async (condition) => {
  try {
    console.log(condition)
    const where = buildWhere(condition);
    const sql = `UPDATE ${Table} SET ? WHERE ${where}`;
    const query = util.promisify(connect.query).bind(connect);
    const result = await query(sql, condition);
    console.log(result)

    return result.affectedRows !== 0;
  } catch (err) {
    console.log(err);
  }
};

const buildWhere = (condition) => {
  let strWhere = "1=1";

  if (condition.internshipcourseId) {
    strWhere +=
      " AND candidates.idInternshipCourse =" + condition.internshipcourseId;
  }
  if (condition.idCandidate) {
    strWhere += " AND idCandidate = " + condition.idCandidate;
  }
  if (condition.fullNames) {
    strWhere += ' AND fullName LIKE "%' + condition.fullNames + '%" ';
  }
  if (condition.statusPr) {
    strWhere += ' AND status = "' + condition.statusPr + '" ';
  }
  if (condition.updateInserts) {
    strWhere += ' AND updateInsert = "' + condition.updateInserts + '" ';
  }
  if (condition.idInternshipCourse) {
    strWhere += " AND idInternshipCourse  = " + condition.idInternshipCourse;
  }
  if (condition.emailCandidates) {
    strWhere +=
      ' AND candidates.emailCandidate = "' + condition.emailCandidates + '"';
  }
  if (condition.idInternshipCourses) {
    strWhere +=
      ' AND candidates.idInternshipCourse = "' +
      condition.idInternshipCourses +
      '"';
  }
  return strWhere;
};
const Table = "candidates";
Candidate.ERROR_EMPTY = "Bạn cần điền đầy đủ thông tin";
Candidate.STATUS_PASS = "Pass";
Candidate.STATUS_FAIL = "Fail";
Candidate.ERROR_SEARCH = "Không có kết quả cho từ khóa này !";
Candidate.ERROR_ID = "Internview không tồn tại trong hệ thống !";
Candidate.ERROR_STATUS = "Kết quả phải là Pass hoặc Fail";
Candidate.SUCCESS_DEL = "Xóa thành công";
Candidate.SUCCESS_UPDATE = "Cập nhật thành công";
Candidate.ERROR_SPECIAL_CHARACTER =
  "Tên người phỏng vấn không chứa ký tự đặt biệt";
Candidate.ERROR_REQUEST = "Bạn cần nhập đủ thông tin";
Candidate.ERROR_NAME_SPECIAL_CHARS = "Tên ứng viên không chứa ký tự đặt biệt !";
Candidate.ERROR_NAME_LENGTH = "Vui lòng nhập đầy đủ Họ và tên !";
Candidate.ERROR_SDT = "Vui lòng nhập lại Số điện thoại!";
Candidate.ERROR_EMAIL = "Vui lòng nhập lại Email !";
Candidate.ERROR_EMAILINTERVIEW = "Vui lòng nhập lại email ứng viên !";
Candidate.ERROR_INTERVIEWDATE =
  "Ngày phỏng vấn không được nhỏ hơn ngày hiện tại !";
Candidate.ERROR_INTERNSHIP_DOMAIN = "Vị trí thực tập từ 2-255 ký tự !";
Candidate.ERROR_PREFERRED_SKILL = "Kỹ năng ưa thích từ 2-255 ký tự !";
Candidate.ERROR_UNIVERSITY = "Trường đại học không từ 2-255 ký tự !";
Candidate.ERROR_FACURTY = " Tên Khoa từ 2-255 ký tự !";
Candidate.ERROR_CURRENT_YEAR_OF_STUDY = "Bạn thuộc sinh viên năm nào ?";
Candidate.ERROR_STUDENTID = "Mã sinh viên không được quá 255 ký tự !";
Candidate.ERROR_PREFERRED_INTERNSHIP_DURATION =
  "Vị trí thực tập từ 2-255 ký tự!";
Candidate.ERROR_INTERNSHIP_SCHEDULE =
  "Vui lòng nhập đầy đủ thông tin kỳ thực tập !";
Candidate.ERROR_GPA = "Điểm trung bình có giá trị từ 0 đến 10 !";
Candidate.ERROR_ID_INTERNSHIP_COURSE = "Vui lòng nhập đầy đủ thông tin !";
Candidate.ERROR_GRADUATION_YEAR =
  "Vui lòng không để trống trường Năm học hiện tại !";
Candidate.ERROR_PROJECT_EXPERIENCE = "Các dự án đã tham gia từ 2-255 ký tự !";
Candidate.ERROR_EXPECTED_GRADUATION_SCHEDULE =
  "Dự kiến tốt nghiệp từ 2-255 ký tự !";
Candidate.ERROR_REMAINING_SUBJECT = "Các môn học còn lại từ 2-255 ký tự !";
Candidate.ERROR_COVID_VACCINATION_CERTIFICATE =
  "Thông tin tim chủng Covid từ 2-255 ký tự !";
Candidate.ERROR_CERTIFICATION_DATE =
  "Ngày chứng nhận không được lớn hơn ngày hiện tại";
Candidate.ERROR_PC_TYPE = "Vui lòng điền thông tin loại máy thực tập !";
Candidate.ERROR_PREFERRED_INTERNSHIP_START_DATE =
  "Ngày bắt đầu thực tập không được nhỏ hơn ngày hiện tại !";
Candidate.ERROR_INTERVIEWER = "Bạn cần nhập thông tin Người phỏng vấn !";
Candidate.ERROR_INTERVIEW_LINK = "Vui lòng nhập Liên kết phỏng vấn đầy đủ";
Candidate.ERROR_REMARKS = "Các nhận xét từ 2-255 ký tự !";
Candidate.ERROR_COMMENTS = " Nhận xét từ 2-255 ký tự !";
Candidate.ERROR_EnglishCommunication = " Tiếng Anh giao tiếp từ 2-255 ký tự !";
Candidate.ERROR_TECHNICAL_COMMENTS = " Thái độ ứng viên từ 2-255 ký tự !";
Candidate.ERROR_TECHNICAL_SCORE = "  Điểm kỹ thuật có giá trị từ 0 đến 10  !"
Candidate.MESSAGE_UPDATE_DONE = "Sửa thành công !";
Candidate.MESSAGE_UPDATE_ERROR = "ID ứng viên này không tồn tại !";
Candidate.MESSAGE_CREATE_DONE = "Thêm ứng viên thành công !";
Candidate.MESSAGE_CREATE_ERROR = "ID ứng viên này không tồn tại !";
Candidate.MESSAGE_DELETE_DONE = "Xóa thành công !";
Candidate.MESSAGE_DELETE_ERROR = " ID ứng viên này không tồn tại !";
Candidate.ERROR_EMAIL_DUPLICATE = "Email đã tồn tại";
Candidate.ERROR_COVID_VACCINATION_INFORMATION =
  "Thông tin Giấy chứng nhận tiêm chủng covid từ 2-255 ký tự !";

module.exports = Candidate;
