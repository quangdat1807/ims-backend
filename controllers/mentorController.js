const mentorModel = require("../models/mentor");
const statusCodes = require("http-status-codes");
const { getMaxListeners } = require("../config/db");

const get = async (req, res) => {
  let page = 1,
    limit = 20;

  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }
  const results = await mentorModel.get({}, [], page, limit);
  const total = await mentorModel.getTotalCount({}, [], page, limit);
  return res.send({
    data: results,
    total: total,
  });
};
const getiddg = async (req, res) => {
  let page = 1,
    limit = 20;

  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }
  let idDG = "";
  if (req.query.idDG) {
    idDG = req.query.idDG;
  }
  let idInternshipCourse = "";
  if (req.query.idInternshipCourse) {
    idInternshipCourse = req.query.idInternshipCourse;
  }
  if(idDG === 'undefined') {
    return res
    .status(statusCodes.BAD_REQUEST)
    .json({ error: mentorModel.ERROR_SPECIAL_CHARACTERISTICS });
  }
  const results = await mentorModel.getdiddg({idDGs: idDG , idInternshipCourse: idInternshipCourse}, [], page, limit);
  const total = await mentorModel.getTotalCount({}, [], page, limit);
  return res.send({
    data: results,
    total: total,
  });
};

const detail = async (req, res) => {
  const id = req.params.id;
  const results = await mentorModel.get({ mentorId: id }, [], 1, 1);
  return res.send({ data: results[0] });
};

const remove = async (req, res) => {
  const id = req.params.id;
  const result = await mentorModel.remove({ mentorId: id });
  return res.status(statusCodes.OK).json({
    status: result,
    Message: result ? mentorModel.MESSAGE_DELETE : mentorModel.ERROR_DELETE,
  });
};

const detailBatch = async (req, res) => {
  let page = 1,
    limit = 20;

  if (req.query.page && parseInt(req.query.page) > 0) {
    page = parseInt(req.query.page);
  }
  let idDG = "";
  if (req.query.idDG) {
    idDG = req.query.idDG;
  }
  const id = req.params.id;
  const results = await mentorModel.getdetailBatch(
    { internshipcourseId: id, idDGs: idDG },
    [],
    page,
    limit
  );
  const total = await mentorModel.getTotalCount(
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
  let idInternshipCourse = "";
  if (req.query.idInternshipCourse) {
    idInternshipCourse = req.query.idInternshipCourse;
  }
  const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  const {
    fullNameMentor: fullNameMentor,
    dayOfBirth: dayOfBirth,
    address: address,
    workplace: workplace,
    email: email,
    position: position,
    idDG: idDG,
  } = req.body;
  if (
    !fullNameMentor ||
    !dayOfBirth ||
    !address ||
    !workplace ||
    !email ||
    !position ||
    !idDG 
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: mentorModel.ERROR_EMPTY });
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

  if (checkForSpecialChar(fullNameMentor)) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: mentorModel.ERROR_SPECIAL_CHARACTERISTICS });
  }

  if (fullNameMentor.length < 2 || fullNameMentor.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: mentorModel.ERROR_LENGHT,
    });
  }
  if (workplace.length < 2 || workplace.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: mentorModel.ERROR_LENGHT,
    });
  }

  if (address.length < 2 || address.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: mentorModel.ERROR_LENGHT,
    });
  }

  if (position.length < 2 || position.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: mentorModel.ERROR_LENGHT,
    });
  }
  if (dayOfBirth < "1960/01/01") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: mentorModel.ERROR_DATE,
    });
  }
  const dateNow = new Date();
  const dateRequest = new Date(
    dayOfBirth.slice(0, 4) +
      "/" +
      dayOfBirth.slice(5, 7) +
      "/" +
      dayOfBirth.slice(8, 10)
  );
  if (dateRequest.getTime() > dateNow.getTime()) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: mentorModel.ERROR_DATENOW,
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: mentorModel.ERROR_EMAIL,
    });
  }

  const countemail = await mentorModel.getdetailBatch(
    { emailMentor: email, idInternshipCourse: idInternshipCourse },
    [],
    1,
    1
  );
  if (countemail.length) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: mentorModel.ERROR_EMAIL_DUPLICATE,
    });
  }

  const results = await mentorModel.create({
    fullNameMentor: fullNameMentor,
    dayOfBirth: dayOfBirth,
    address: address,
    workplace: workplace,
    email: email,
    position: position,
    idDG: idDG,
    idInternshipCourse: idInternshipCourse,
  });
  return res.status(statusCodes.OK).json({
    status: results,
    message: results ? mentorModel.MESSAGE_CREATE : mentorModel.ERROR_CREATE,
  });
};

const update = async (req, res) => {
  const emailRegex =
    /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;

  const idMentor = req.params.id;
  const {
    fullNameMentor: fullNameMentor,
    dayOfBirth: dayOfBirth,
    address: address,
    workplace: workplace,
    email: email,
    position: position,
    idDG: idDG,
  } = req.body;
  if (
    !fullNameMentor ||
    !dayOfBirth ||
    !address ||
    !workplace ||
    !email ||
    !position ||
    !idDG
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: mentorModel.ERROR_EMPTY });
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
  if (checkForSpecialChar(fullNameMentor)) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: mentorModel.ERROR_SPECIAL_CHARACTERISTICS });
  }

  if (fullNameMentor.length < 2 || fullNameMentor.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: mentorModel.ERROR_LENGHT,
    });
  }
  if (workplace.length < 2 || workplace.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: mentorModel.ERROR_LENGHT,
    });
  }

  if (address.length < 2 || address.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: mentorModel.ERROR_LENGHT,
    });
  }

  if (position.length < 2 || position.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: mentorModel.ERROR_LENGHT,
    });
  }
  if (dayOfBirth < "1960/01/01") {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: mentorModel.ERROR_DATE,
    });
  }
  const dateNow = new Date();
  const dateRequest = new Date(
    dayOfBirth.slice(0, 4) +
      "/" +
      dayOfBirth.slice(5, 7) +
      "/" +
      dayOfBirth.slice(8, 10)
  );
  if (dateRequest.getTime() > dateNow.getTime()) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: mentorModel.ERROR_DATENOW,
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: mentorModel.ERROR_EMAIL,
    });
  }

  const result = await mentorModel.update({
    fullNameMentor: fullNameMentor,
    dayOfBirth: dayOfBirth,
    address: address,
    workplace: workplace,
    email: email,
    position: position,
    idDG: idDG,
    idMentor: idMentor,
  });
  return res.status(statusCodes.OK).json({
    data: result,
    message: result ? mentorModel.MESSAGE_UPDATE : mentorModel.ERROR_UPDATE,
  });
};

module.exports = { get, detailBatch, detail, update, create, remove , getiddg};
