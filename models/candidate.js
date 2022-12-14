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
Candidate.ERROR_EMPTY = "B???n c???n ??i???n ?????y ????? th??ng tin";
Candidate.STATUS_PASS = "Pass";
Candidate.STATUS_FAIL = "Fail";
Candidate.ERROR_SEARCH = "Kh??ng c?? k???t qu??? cho t??? kh??a n??y !";
Candidate.ERROR_ID = "Internview kh??ng t???n t???i trong h??? th???ng !";
Candidate.ERROR_STATUS = "K???t qu??? ph???i l?? Pass ho???c Fail";
Candidate.SUCCESS_DEL = "X??a th??nh c??ng";
Candidate.SUCCESS_UPDATE = "C???p nh???t th??nh c??ng";
Candidate.ERROR_SPECIAL_CHARACTER =
  "T??n ng?????i ph???ng v???n kh??ng ch???a k?? t??? ?????t bi???t";
Candidate.ERROR_REQUEST = "B???n c???n nh???p ????? th??ng tin";
Candidate.ERROR_NAME_SPECIAL_CHARS = "T??n ???ng vi??n kh??ng ch???a k?? t??? ?????t bi???t !";
Candidate.ERROR_NAME_LENGTH = "Vui l??ng nh???p ?????y ????? H??? v?? t??n !";
Candidate.ERROR_SDT = "Vui l??ng nh???p l???i S??? ??i???n tho???i!";
Candidate.ERROR_EMAIL = "Vui l??ng nh???p l???i Email !";
Candidate.ERROR_EMAILINTERVIEW = "Vui l??ng nh???p l???i email ???ng vi??n !";
Candidate.ERROR_INTERVIEWDATE =
  "Ng??y ph???ng v???n kh??ng ???????c nh??? h??n ng??y hi???n t???i !";
Candidate.ERROR_INTERNSHIP_DOMAIN = "V??? tr?? th???c t???p t??? 2-255 k?? t??? !";
Candidate.ERROR_PREFERRED_SKILL = "K??? n??ng ??a th??ch t??? 2-255 k?? t??? !";
Candidate.ERROR_UNIVERSITY = "Tr?????ng ?????i h???c kh??ng t??? 2-255 k?? t??? !";
Candidate.ERROR_FACURTY = " T??n Khoa t??? 2-255 k?? t??? !";
Candidate.ERROR_CURRENT_YEAR_OF_STUDY = "B???n thu???c sinh vi??n n??m n??o ?";
Candidate.ERROR_STUDENTID = "M?? sinh vi??n kh??ng ???????c qu?? 255 k?? t??? !";
Candidate.ERROR_PREFERRED_INTERNSHIP_DURATION =
  "V??? tr?? th???c t???p t??? 2-255 k?? t???!";
Candidate.ERROR_INTERNSHIP_SCHEDULE =
  "Vui l??ng nh???p ?????y ????? th??ng tin k??? th???c t???p !";
Candidate.ERROR_GPA = "??i???m trung b??nh c?? gi?? tr??? t??? 0 ?????n 10 !";
Candidate.ERROR_ID_INTERNSHIP_COURSE = "Vui l??ng nh???p ?????y ????? th??ng tin !";
Candidate.ERROR_GRADUATION_YEAR =
  "Vui l??ng kh??ng ????? tr???ng tr?????ng N??m h???c hi???n t???i !";
Candidate.ERROR_PROJECT_EXPERIENCE = "C??c d??? ??n ???? tham gia t??? 2-255 k?? t??? !";
Candidate.ERROR_EXPECTED_GRADUATION_SCHEDULE =
  "D??? ki???n t???t nghi???p t??? 2-255 k?? t??? !";
Candidate.ERROR_REMAINING_SUBJECT = "C??c m??n h???c c??n l???i t??? 2-255 k?? t??? !";
Candidate.ERROR_COVID_VACCINATION_CERTIFICATE =
  "Th??ng tin tim ch???ng Covid t??? 2-255 k?? t??? !";
Candidate.ERROR_CERTIFICATION_DATE =
  "Ng??y ch???ng nh???n kh??ng ???????c l???n h??n ng??y hi???n t???i";
Candidate.ERROR_PC_TYPE = "Vui l??ng ??i???n th??ng tin lo???i m??y th???c t???p !";
Candidate.ERROR_PREFERRED_INTERNSHIP_START_DATE =
  "Ng??y b???t ?????u th???c t???p kh??ng ???????c nh??? h??n ng??y hi???n t???i !";
Candidate.ERROR_INTERVIEWER = "B???n c???n nh???p th??ng tin Ng?????i ph???ng v???n !";
Candidate.ERROR_INTERVIEW_LINK = "Vui l??ng nh???p Li??n k???t ph???ng v???n ?????y ?????";
Candidate.ERROR_REMARKS = "C??c nh???n x??t t??? 2-255 k?? t??? !";
Candidate.ERROR_COMMENTS = " Nh???n x??t t??? 2-255 k?? t??? !";
Candidate.ERROR_EnglishCommunication = " Ti???ng Anh giao ti???p t??? 2-255 k?? t??? !";
Candidate.ERROR_TECHNICAL_COMMENTS = " Th??i ????? ???ng vi??n t??? 2-255 k?? t??? !";
Candidate.ERROR_TECHNICAL_SCORE = "  ??i???m k??? thu???t c?? gi?? tr??? t??? 0 ?????n 10  !"
Candidate.MESSAGE_UPDATE_DONE = "S???a th??nh c??ng !";
Candidate.MESSAGE_UPDATE_ERROR = "ID ???ng vi??n n??y kh??ng t???n t???i !";
Candidate.MESSAGE_CREATE_DONE = "Th??m ???ng vi??n th??nh c??ng !";
Candidate.MESSAGE_CREATE_ERROR = "ID ???ng vi??n n??y kh??ng t???n t???i !";
Candidate.MESSAGE_DELETE_DONE = "X??a th??nh c??ng !";
Candidate.MESSAGE_DELETE_ERROR = " ID ???ng vi??n n??y kh??ng t???n t???i !";
Candidate.ERROR_EMAIL_DUPLICATE = "Email ???? t???n t???i";
Candidate.ERROR_COVID_VACCINATION_INFORMATION =
  "Th??ng tin Gi???y ch???ng nh???n ti??m ch???ng covid t??? 2-255 k?? t??? !";

module.exports = Candidate;
