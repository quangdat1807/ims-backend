const candidateModel = require("../models/candidate");
const statusCodes = require("http-status-codes");
const dateNow = new Date();
const update = async (req, res) => {
  const id = req.params.id;
  const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  const {
    emailInterviewer,
    interviewLink,
    interviewDate,
    interviewTime,
    interviewer,
  } = req.body;
  if (
    !emailInterviewer ||
    !interviewLink ||
    !interviewDate ||
    !interviewTime ||
    !interviewer
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: candidateModel.ERROR_REQUEST });
  }

  if (!emailRegex.test(emailInterviewer)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_EMAIL,
    });
  }

  const dateNow = new Date();
  const dateRequest = new Date(
    interviewDate.slice(0, 4) +
      "/" +
      interviewDate.slice(5, 7) +
      "/" +
      interviewDate.slice(8, 10) +
      "," +
      interviewTime.slice(0, 2) +
      ":" +
      interviewTime.slice(3, 5)
  );

  if (dateRequest.getTime() < dateNow.getTime()) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_INTERVIEWDATE,
    });
  }
  if (interviewLink.length < 2 || interviewLink.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_INTERVIEW_LINK,
    });
  }

  const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  const checkForSpecialChar = function (string) {
    for (i = 0; i < specialChars.length; i++) {
      if (string.indexOf(specialChars[i]) > -1) {
        return true;
      }
    }
    return false;
  };

  if (checkForSpecialChar(interviewer)) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: candidateModel.ERROR_SPECIAL_CHARACTER });
  }
  if (interviewer.length < 2 || interviewer.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_INTERVIEWER,
    });
  }

  const result = await candidateModel.update({
    emailInterviewer: emailInterviewer,
    interviewLink: interviewLink,
    interviewDate: interviewDate,
    interviewTime: interviewTime,
    interviewer: interviewer,
    idCandidate: id,
  });

  return res.status(statusCodes.OK).json({
    data: result,
    message: result ? candidateModel.MESSAGE_UPDATE_DONE : candidateModel.MESSAGE_UPDATE_ERROR,
  });
};
const getCandidate = async (req, res) => {
  let page = 1,
    limit = 20;
  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }
  const id = req.params.id;
  const results = await candidateModel.getByID(
    { idCandidate: id },
    [],
    page,
    limit
  );
  return res.status(statusCodes.OK).json({
    data: results,
  });
};
const getBatch = async (req, res) => {
  let page = 0,
    limit = 10;

  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }
  if (req.query.limit && parseInt(req.query.limit) > 0) {
    limit = parseInt(req.query.limit);
  }
  let fullName = "";
  if (req.query.fullName) {
    fullName = req.query.fullName;
  }
  const id = req.params.id;
  const results = await candidateModel.getBatch(
    { internshipcourseId: id, fullNames: fullName },
    [],
    page,
    limit
  );
  const total = await candidateModel.getTotalCountCandidate(
    { internshipcourseId: id },
    [],
    page,
    limit
  );
  return res.send({
    data: results,
    total: total,
  });
};
const create = async (req, res) => {
  const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const sdtRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  const scoreRegex = /^[0-9](\.[0-9]{1,2})?$|^10(\.[0]{1,2})?$/g;
  const id = req.params.id;
  const status = "Waiting for results";
  const {
    fullName,
    tel,
    emailCandidate,
    internshipDomain,
    preferredSkills,
    university,
    faculty,
    currentYearofStudy,
    studentID,
    graduationYear,
    GPA,
    pcType,
    preferredInternshipStartDate,
    preferredInternshipDuration,
    internshipSchedule,
    idInternshipCourse,
    projectExperience,
    expectedGraduationSchedule,
    covidVaccinationiInformation,
    remainingSubjects,
    covidVaccinationCertificate,
    certificationDate,
  } = req.body;
  
  if (
    !fullName ||
    !tel ||
    !emailCandidate ||
    !internshipDomain ||
    !preferredSkills ||
    !university ||
    !faculty ||
    !currentYearofStudy ||
    !studentID ||
    !graduationYear ||
    !GPA ||
    !pcType ||
    !preferredInternshipStartDate ||
    !preferredInternshipDuration ||
    !internshipSchedule ||
    !idInternshipCourse ||
    !projectExperience ||
    !expectedGraduationSchedule ||
    !covidVaccinationiInformation ||
    !remainingSubjects ||
    !covidVaccinationCertificate ||
    !certificationDate
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: candidateModel.ERROR_REQUEST });
  }
  const countemail = await candidateModel.getBatch(
    { emailCandidates: emailCandidate, idInternshipCourses: idInternshipCourse },
    [],
    1,
    1
  );
  if (countemail.length) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_EMAIL_DUPLICATE,
    });
  }
  const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  const checkForSpecialChar = function (string) {
    for (i = 0; i < specialChars.length; i++) {
      if (string.indexOf(specialChars[i]) > -1) {
        return true;
      }
    }
    return false;
  };
  if (checkForSpecialChar(fullName)) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: candidateModel.ERROR_NAME_SPECIAL_CHARS });
  }
  if (fullName.length < 2 || fullName.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_NAME_LENGTH,
    });
  }
  if (!sdtRegex.test(tel)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_SDT,
    });
  }
  if (!emailRegex.test(emailCandidate)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_EMAIL,
    });
  }
  if (internshipDomain.length < 2 || internshipDomain.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_INTERNSHIP_DOMAIN,
    });
  }
  if (preferredSkills.length < 2 || preferredSkills.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_PREFERRED_SKILL,
    });
  }
  if (university.length < 2 || university.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_UNIVERSITY,
    });
  }
  if (faculty.length < 2 || faculty.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_FACURTY,
    });
  }
  if (currentYearofStudy === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_CURRENT_YEAR_OF_STUDY,
    });
  }
  if (studentID.length < 2 || studentID.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_STUDENTID,
    });
  }
  if (preferredInternshipDuration === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_PREFERRED_INTERNSHIP_DURATION,
    });
  }
  if (internshipSchedule === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_INTERNSHIP_SCHEDULE,
    });
  }
  if (!scoreRegex.test(GPA)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_GPA,
    });
  }
  if (idInternshipCourse === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_ID_INTERNSHIP_COURSE,
    });
  }
  if (graduationYear === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_GRADUATION_YEAR,
    });
  }
  if (projectExperience.length < 2 || projectExperience.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_PROJECT_EXPERIENCE,
    });
  }
  if (
    expectedGraduationSchedule.length < 2 ||
    expectedGraduationSchedule.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_EXPECTED_GRADUATION_SCHEDULE ,
    });
  }
  if (remainingSubjects.length < 2 || remainingSubjects.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_REMAINING_SUBJECT,
    });
  }
  if (
    covidVaccinationiInformation.length < 2 ||
    covidVaccinationiInformation.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_COVID_VACCINATION_CERTIFICATE,
    });
  }
  const dateRequestCertification = new Date(
    certificationDate.slice(0, 4) +
      "/" +
      certificationDate.slice(5, 7) +
      "/" +
      certificationDate.slice(8, 10) +
      ","
  );
  if (
    dateRequestCertification.getTime() > dateNow.getTime() ||
    dateRequestCertification.getTime() == dateNow.getTime()
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_CERTIFICATION_DATE,
    });
  }
  if (
    covidVaccinationCertificate.length < 2 ||
    covidVaccinationCertificate.length > 255
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_COVID_VACCINATION_CERTIFICATE,
    });
  }
  if (pcType === "") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_PC_TYPE,
    });
  }
  const dateRequest = new Date(
    preferredInternshipStartDate.slice(0, 4) +
      "/" +
      preferredInternshipStartDate.slice(5, 7) +
      "/" +
      preferredInternshipStartDate.slice(8, 10) +
      ","
  );
  if (
    dateRequest.getTime() < dateNow.getTime() ||
    dateRequest.getTime() == dateNow.getTime()
  ) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: candidateModel.ERROR_PREFERRED_INTERNSHIP_START_DATE,
    });
  }
  const result = await candidateModel.create({
    status: status,
    fullName: fullName,
    tel: tel,
    emailCandidate: emailCandidate,
    internshipDomain: internshipDomain,
    preferredSkills: preferredSkills,
    university: university,
    faculty: faculty,
    currentYearofStudy: currentYearofStudy,
    studentID: studentID,
    preferredInternshipStartDate: preferredInternshipStartDate,
    preferredInternshipDuration: preferredInternshipDuration,
    internshipSchedule: internshipSchedule,
    GPA: GPA,
    idInternshipCourse: idInternshipCourse,
    graduationYear: graduationYear,
    projectExperience: projectExperience,
    expectedGraduationSchedule: expectedGraduationSchedule,
    remainingSubjects: remainingSubjects,
    covidVaccinationiInformation: covidVaccinationiInformation,
    certificationDate: certificationDate,
    covidVaccinationCertificate: covidVaccinationCertificate,
    pcType: pcType,
  });
  return res.status(statusCodes.OK).json({
    status: result,
    error: result ? candidateModel.MESSAGE_CREATE_DONE  : candidateModel.MESSAGE_CREATE_ERROR,
  });

};
const remove = async (req, res) => {
  const id = req.params.id;
  const result = await candidateModel.remove({ idCandidate: id });
  return res.status(statusCodes.OK).json({
    status: result,
    error: result ? candidateModel.MESSAGE_DELETE_DONE : candidateModel.MESSAGE_DELETE_ERROR,
  });
};
const updateCandidate = async (req, res) => {
  const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const sdtRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  const scoreRegex = /^[0-9](\.[0-9]{1,2})?$|^10(\.[0]{1,2})?$/g;
  const id = req.params.id;
  const {
    fullName,
    tel,
    emailCandidate,
    internshipDomain,
    preferredSkills,
    university,
    faculty,
    currentYearofStudy,
    studentID,
    preferredInternshipStartDate,
    preferredInternshipDuration,
    idInternshipCourse,
    internshipSchedule,
    GPA,
    graduationYear,
    projectExperience,
    expectedGraduationSchedule,
    remainingSubjects,
    covidVaccinationiInformation,
    certificationDate,
    covidVaccinationCertificate,
    pcType,
  } = req.body;
  console.log( fullName,
    tel,
    emailCandidate,
    internshipDomain,
    preferredSkills,
    university,
    faculty,
    currentYearofStudy,
    studentID,
    preferredInternshipStartDate,
    preferredInternshipDuration,
    idInternshipCourse,
    internshipSchedule,
    GPA,
    graduationYear,
    projectExperience,
    expectedGraduationSchedule,
    remainingSubjects,
    covidVaccinationiInformation,
    certificationDate,
    covidVaccinationCertificate,
    pcType,)
  if (
    !fullName ||
    !tel ||
    !emailCandidate ||
    !internshipDomain ||
    !preferredSkills ||
    !university ||
    !faculty ||
    !currentYearofStudy ||
    !studentID ||
    !preferredInternshipStartDate ||
    !preferredInternshipDuration ||
    !internshipSchedule ||
    !GPA ||
    !graduationYear ||
    !projectExperience ||
    !expectedGraduationSchedule ||
    !remainingSubjects ||
    !covidVaccinationiInformation ||
    !certificationDate ||
    !covidVaccinationCertificate ||
    !pcType
  ) {
    return res
    .status(statusCodes.BAD_REQUEST)
    .json({ error: candidateModel.ERROR_REQUEST });
}
 if(!emailRegex.test(emailCandidate)){
  return res
  .status(statusCodes.BAD_REQUEST)
  .json({ error: candidateModel.ERROR_EMAIL });
 }
const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
const checkForSpecialChar = function (string) {
  for (i = 0; i < specialChars.length; i++) {
    if (string.indexOf(specialChars[i]) > -1) {
      return true;
    }
  }
  return false;
};
if (checkForSpecialChar(fullName)) {
  return res
    .status(statusCodes.BAD_REQUEST)
    .json({ error: candidateModel.ERROR_NAME_SPECIAL_CHARS });
}
if (fullName.length < 2 || fullName.length > 255) {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_NAME_LENGTH,
  });
}
if (!sdtRegex.test(tel)) {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_SDT,
  });
}
if (!emailRegex.test(emailCandidate)) {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_EMAIL,
  });
}
if (internshipDomain.length < 2 || internshipDomain.length > 255) {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_INTERNSHIP_DOMAIN,
  });
}
if (preferredSkills.length < 2 || preferredSkills.length > 255) {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_PREFERRED_SKILL,
  });
}
if (university.length < 2 || university.length > 255) {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_UNIVERSITY,
  });
}
if (faculty.length < 2 || faculty.length > 255) {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_FACURTY,
  });
}
if (currentYearofStudy === "") {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_CURRENT_YEAR_OF_STUDY,
  });
}
if (studentID.length < 2 || studentID.length > 255) {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_STUDENTID,
  });
}
if (preferredInternshipDuration === "") {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_PREFERRED_INTERNSHIP_DURATION,
  });
}
if (internshipSchedule === "") {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_INTERNSHIP_SCHEDULE,
  });
}
if (!scoreRegex.test(GPA)) {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_GPA,
  });
}
if (idInternshipCourse === "") {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_ID_INTERNSHIP_COURSE,
  });
}
if (graduationYear === "") {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_GRADUATION_YEAR,
  });
}
if (projectExperience.length < 2 || projectExperience.length > 255) {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_PROJECT_EXPERIENCE,
  });
}
if (
  expectedGraduationSchedule.length < 2 ||
  expectedGraduationSchedule.length > 255
) {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_EXPECTED_GRADUATION_SCHEDULE ,
  });
}
if (remainingSubjects.length < 2 || remainingSubjects.length > 255) {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_REMAINING_SUBJECT,
  });
}
if (
  covidVaccinationiInformation.length < 2 ||
  covidVaccinationiInformation.length > 255
) {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_COVID_VACCINATION_CERTIFICATE,
  });
}
const dateRequestCertification = new Date(
  certificationDate.slice(0, 4) +
    "/" +
    certificationDate.slice(5, 7) +
    "/" +
    certificationDate.slice(8, 10) +
    ","
);
if (
  dateRequestCertification.getTime() > dateNow.getTime()
  ||
    dateRequestCertification.getTime() == dateNow.getTime()
) {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_CERTIFICATION_DATE,
  });
}
if (
  covidVaccinationCertificate.length < 2 ||
  covidVaccinationCertificate.length > 255
) {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_COVID_VACCINATION_CERTIFICATE,
  });
}
if (pcType === "") {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_PC_TYPE,
  });
}
const dateRequest = new Date(
  preferredInternshipStartDate.slice(0, 4) +
    "/" +
    preferredInternshipStartDate.slice(5, 7) +
    "/" +
    preferredInternshipStartDate.slice(8, 10) +
    ","
);
if (
  dateRequest.getTime() < dateNow.getTime() ||
  dateRequest.getTime() == dateNow.getTime()
) {
  return res.status(statusCodes.BAD_REQUEST).json({
    error: candidateModel.ERROR_PREFERRED_INTERNSHIP_START_DATE,
  });
}
  const result = await candidateModel.update({
    fullName: fullName,
    tel: tel,
    emailCandidate: emailCandidate,
    internshipDomain: internshipDomain,
    preferredSkills: preferredSkills,
    university: university,
    faculty: faculty,
    currentYearofStudy: currentYearofStudy,
    studentID: studentID,
    preferredInternshipStartDate: preferredInternshipStartDate,
    preferredInternshipDuration: preferredInternshipDuration,
    internshipSchedule: internshipSchedule,
    GPA: GPA,
    graduationYear: graduationYear,
    projectExperience: projectExperience,
    expectedGraduationSchedule: expectedGraduationSchedule,
    remainingSubjects: remainingSubjects,
    covidVaccinationiInformation: covidVaccinationiInformation,
    certificationDate: certificationDate,
    covidVaccinationCertificate: covidVaccinationCertificate,
    pcType: pcType,
    idCandidate: id,
  });
  return res.status(statusCodes.OK).json({
    data: result,
    message: result
      ? candidateModel.MESSAGE_UPDATE_DONE
      : candidateModel.MESSAGE_UPDATE_ERROR,
  });
};

module.exports = {
  update: update,
  updateCandidate: updateCandidate,
  remove: remove,
  create: create,
  getCandidate: getCandidate,
  getBatch: getBatch,
};
