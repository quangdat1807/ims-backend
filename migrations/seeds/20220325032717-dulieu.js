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

exports.up = function (db) {
  db.insert("internshipcourse", {
    idInternshipCourse: 1,
    nameCoure: "Batch 1",
    dateStart: "2006/02/14",
    dateEnd: "2006/05/08",
    status: "Done",
    kindOfInternship: "Full time",
  });
  db.insert("internshipcourse", {
    idInternshipCourse: 2,
    nameCoure: "Batch 2",
    dateStart: "2007/02/14",
    dateEnd: "2007/05/08",
    status: "Done",
    kindOfInternship: "Full time",
  });
  db.insert("internshipcourse", {
    idInternshipCourse: 3,
    nameCoure: "Batch 3",
    dateStart: "2008/02/14",
    dateEnd: "2008/05/08",
    status: "Done",
    kindOfInternship: "Full time",
  });
  db.insert("internshipcourse", {
    idInternshipCourse: 4,
    nameCoure: "Batch 4",
    dateStart: "2009/02/14",
    dateEnd: "2009/05/08",
    status: "Done",
    kindOfInternship: "Full time",
  });
  db.insert("internshipcourse", {
    idInternshipCourse: 5,
    nameCoure: "Batch 5",
    dateStart: "2010/02/14",
    dateEnd: "2010/05/08",
    status: "Done",
    kindOfInternship: "Full time",
  });
  db.insert("internshipcourse", {
    idInternshipCourse: 6,
    nameCoure: "Batch 6",
    dateStart: "2011/02/14",
    dateEnd: "2011/05/08",
    status: "Done",
    kindOfInternship: "Full time",
  });
  db.insert("internshipcourse", {
    idInternshipCourse: 7,
    nameCoure: "Batch 7",
    dateStart: "2012/02/14",
    dateEnd: "2012/05/08",
    status: "Done",
    kindOfInternship: "Full time",
  });
  db.insert("internshipcourse", {
    idInternshipCourse: 8,
    nameCoure: "Batch 8",
    dateStart: "2013/02/14",
    dateEnd: "2013/05/08",
    status: "Done",
    kindOfInternship: "Full time",
  });
  db.insert("internshipcourse", {
    idInternshipCourse: 9,
    nameCoure: "Batch 9",
    dateStart: "2022/02/14",
    dateEnd: "2022/05/08",
    status: "In progress",
    kindOfInternship: "Full time",
  });

  ////////////////////////////
  db.insert("dg", {
    nameDG: "DG1",
  });
  db.insert("dg", {
    nameDG: "DG2",
  });
  db.insert("dg", {
    nameDG: "DG3",
  });
  db.insert("dg", {
    nameDG: "DG4",
  });

  db.insert("dg", {
    nameDG: "DG5",
  });
  db.insert("dg", {
    nameDG: "DG6",
  });

  db.insert("dg", {
    nameDG: "DG7",
  });
  db.insert("dg", {
    nameDG: "DG8",
  });

  db.insert("dg", {
    nameDG: "DG9",
  });
  db.insert("dg", {
    nameDG: "DG10",
  });

  ////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////

  db.insert("mentor", {
    fullNameMentor: "Mai Phi Hùng",
    dayOfBirth: "1930/07/14",
    address: "Quy Nhơn",
    workplace: "TMA Solution",
    email: "mphung.tma.@gmail.com",
    position: "Project Management",
    idDG: 4,
    idInternshipCourse: 9,
  });
  db.insert("mentor", {
    fullNameMentor: "Võ Văn Dũng",
    dayOfBirth: "1930/09/14",
    address: "Quy Nhơn",
    workplace: "TMA Solution",
    email: "vvdung.tma.@gmail.com",
    position: "Project Management",
    idDG: 4,
    idInternshipCourse: 9,
  });
  db.insert("mentor", {
    fullNameMentor: "Nguyễn Văn Chiến",
    dayOfBirth: "1930/02/18",
    address: "Quy Nhơn",
    workplace: "TMA Solution",
    email: "mphung.tma.@gmail.com",
    position: "Project Management",
    idDG: 4,
    idInternshipCourse: 9,
  });
  db.insert("mentor", {
    fullNameMentor: "Võ Văn Ý",
    dayOfBirth: "1930/01/18",
    address: "Quy Nhơn",
    workplace: "TMA Solution",
    email: "vvy.tma.@gmail.com",
    position: "Project Management",
    idDG: 5,
    idInternshipCourse: 9,
  });
  db.insert("mentor", {
    fullNameMentor: "Nguyễn Đắc",
    dayOfBirth: "1930/01/18",
    address: "Quy Nhơn",
    workplace: "TMA Solution",
    email: "ndac.tma.@gmail.com",
    position: "Project Management",
    idDG: 6,
    idInternshipCourse: 9,
  });

  db.insert("mentor", {
    fullNameMentor: "Nguyễn Thành Công",
    dayOfBirth: "1930/01/18",
    address: "Quy Nhơn",
    workplace: "TMA Solution",
    email: "ndac.tma.@gmail.com",
    position: "Project Management",
    idDG: 5,
    idInternshipCourse: 8,
  });
  ///////////////////////////////////////////////////////
  db.insert("candidates", {
    fullName: "Lê Ngọc Huy",
    tel: "0985567654",
    emailCandidate: "huy@gmail.com",
    idDG: 4,
    interviewTime: "",
    interviewDate: "",
    status: "",
    remark: "Học để nâng cao kỹ năng",
    idMentor: 1,
    technicalComments: "",
    technicalScore: "",
    attitude: "",
    englishCommunication: "",
    comments: "",
    remarks: "",
    internshipDomain: "Development (Phát triển phần mềm) ",
    preferredSkills: "kỹ năng về javascript, css, html, php",
    university: "Đại học Quy Nhơn",
    faculty: "Công nghệ thông tin (chuyên ngành công nghệ phần mềm)",
    currentYearofStudy: "4th year",
    studentID: "4151050029",
    preferredInternshipStartDate: "",
    preferredInternshipDuration: "",
    internshipSchedule: "",
    GPA: "7.0",
    idInternshipCourse: 9,
  });
  db.insert("candidates", {
    fullName: "Nguyễn Hoàng Phúc",
    tel: "0989754654",
    emailCandidate: "phuc@gmail.com",
    idDG: 4,
    interviewTime: "",
    interviewDate: "",
    status: "",
    remark: "Học để nâng cao kỹ năng",
    idMentor: 1,
    technicalComments: "",
    technicalScore: "",
    attitude: "",
    englishCommunication: "",
    comments: "",
    remarks: "",
    internshipDomain: "Development (Phát triển phần mềm) ",
    preferredSkills: "kỹ năng về javascript, css, html, php",
    university: "Đại học Quy Nhơn",
    faculty: "Công nghệ thông tin (chuyên ngành công nghệ phần mềm)",
    currentYearofStudy: "4th year",
    studentID: ",4151050099",
    preferredInternshipStartDate: "",
    preferredInternshipDuration: "",
    internshipSchedule: "",
    GPA: "7.8",
    idInternshipCourse: 9,
  });
  db.insert("candidates", {
    fullName: "Diệp Túy Dũng",
    tel: "0989767654",
    emailCandidate: "dung@gmail.com",
    idDG: 4,
    interviewTime: "",
    interviewDate: "",
    status: "",
    remark: "Học để nâng cao kỹ năng",
    idMentor: 1,
    technicalComments: "",
    technicalScore: "",
    attitude: "",
    englishCommunication: "",
    comments: "",
    remarks: "",
    internshipDomain: "Development (Phát triển phần mềm) ",
    preferredSkills: "kỹ năng về javascript, css, html, php",
    university: "Đại học Quy Nhơn",
    faculty: "Công nghệ thông tin (chuyên ngành công nghệ phần mềm)",
    currentYearofStudy: "4th year",
    studentID: ",4151050066",
    preferredInternshipStartDate: "",
    preferredInternshipDuration: "",
    internshipSchedule: "",
    GPA: "9.0",
    idInternshipCourse: 9,
  });
  db.insert("candidates", {
    fullName: "Nguyễn Ngọc Nguyên",
    tel: "0983337654",
    emailCandidate: "nguyen@gmail.com",
    idDG: 6,
    interviewTime: " ",
    interviewDate: " ",
    status: " ",
    remark: "Học để nâng cao kỹ năng",
    idMentor: 3,
    technicalComments: " ",
    technicalScore: " ",
    attitude: " ",
    englishCommunication: "",
    comments: " ",
    remarks: " ",
    internshipDomain: "Development (Phát triển phần mềm) ",
    preferredSkills: "kỹ năng về javascript, css, html, php",
    university: "Đại học Quy Nhơn",
    faculty: "Công nghệ thông tin (chuyên ngành công nghệ phần mềm)",
    currentYearofStudy: "4th year",
    studentID: ",4151050028",
    preferredInternshipStartDate: " ",
    preferredInternshipDuration: " ",
    internshipSchedule: " ",
    GPA: "9.2",
    idInternshipCourse: 9,
  });
  db.insert("candidates", {
    fullName: "Nguyễn Chiến Thắng",
    tel: "0983377654",
    emailCandidate: "thang@gmail.com",
    idDG: 5,
    interviewTime: " ",
    interviewDate: " ",
    status: " ",
    remark: "Học để nâng cao kỹ năng",
    idMentor: 3,
    technicalComments: " ",
    technicalScore: " ",
    attitude: " ",
    englishCommunication: "",
    comments: " ",
    remarks: " ",
    internshipDomain: "Development (Phát triển phần mềm) ",
    preferredSkills: "kỹ năng về javascript, css, html, php",
    university: "Đại học Quy Nhơn",
    faculty: "Công nghệ thông tin (chuyên ngành công nghệ phần mềm)",
    currentYearofStudy: "4th year",
    studentID: ",4151055528",
    preferredInternshipStartDate: " ",
    preferredInternshipDuration: " ",
    internshipSchedule: " ",
    GPA: "9.2",
    idInternshipCourse: 8,
  });
  db.insert("candidates", {
    fullName: "Nguyễn Ngọc Tú",
    tel: "0984447654",
    emailCandidate: "tu@gmail.com",
    idDG: 5,
    interviewTime: " ",
    interviewDate: " ",
    status: " ",
    remark: "Học để nâng cao kỹ năng",
    idMentor: 3,
    technicalComments: " ",
    technicalScore: " ",
    attitude: " ",
    englishCommunication: "",
    comments: " ",
    remarks: " ",
    internshipDomain: "Development (Phát triển phần mềm) ",
    preferredSkills: "kỹ năng về javascript, css, html, php",
    university: "Đại học Quy Nhơn",
    faculty: "Công nghệ thông tin (chuyên ngành công nghệ phần mềm)",
    currentYearofStudy: "4th year",
    studentID: ",4151050338",
    preferredInternshipStartDate: " ",
    preferredInternshipDuration: " ",
    internshipSchedule: " ",
    GPA: "9.2",
    idInternshipCourse: 8,
  });
  return null;
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
