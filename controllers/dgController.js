const dgModel = require("../models/dg");
const statusCodes = require("http-status-codes");

const getList = async (req, res) => {
  let idInternshipCourse = "";
  if (req.query.idInternshipCourse) {
    idInternshipCourse = req.query.idInternshipCourse;
  }
  const result = await dgModel.getList({idInternshipCourse: idInternshipCourse});
  return res.status(statusCodes.OK).json({ data: result });
};

const create = async (req, res) => {
  let idInternshipCourse = "";
  if (req.query.idInternshipCourse) {
    idInternshipCourse = req.query.idInternshipCourse;
  }
  const { nameDG } = req.body;
  const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  const checkForSpecialChar = function (string) {
    for (i = 0; i < specialChars.length; i++) {
      if (string.indexOf(specialChars[i]) > -1) {
        return true;
      }
    }
    return false;
  };

  if (checkForSpecialChar(nameDG)) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: "không được nhập kí tự đặc biệt" });
  }
  if (!nameDG) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: dgModel.ErrorRequest });
  }
  if (nameDG.length < 0 || nameDG.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: dgModel.ErrorName,
    });
  }

  const results = await dgModel.create({
    nameDG: nameDG,
    idInternshipCourse: idInternshipCourse
  });
  return res.status(statusCodes.OK).json({
    status: results,
    message: results ? dgModel.SuccessAdd : dgModel.FailureAdd,
  });
};

const update = async (req, res) => {
  const id = req.params.id;
  const { nameDG } = req.body;
  const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  const checkForSpecialChar = function (string) {
    for (i = 0; i < specialChars.length; i++) {
      if (string.indexOf(specialChars[i]) > -1) {
        return true;
      }
    }
    return false;
  };

  if (checkForSpecialChar(nameDG)) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: dgModel.ErrorSpecialChars });
  }
  if (!nameDG) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: dgModel.ErrorRequest });
  }
  if (nameDG.length < 3 || nameDG.length > 255) {
    return res.status(statusCodes.BAD_REQUEST).json({
      error: dgModel.ErrorName,
    });
  }

  const result = await dgModel.update({
    nameDG: nameDG,
    idDG: id,
  });
  return res.status(statusCodes.OK).json({
    data: result,
    message: result ? dgModel.SuccessMessage : dgModel.FailureMessage,
  });
};

const remove = async (req, res) => {
  const id = req.params.id;
  const result = await dgModel.remove({ idDG: id });
  return res.status(statusCodes.OK).json({
    status: result,
    message: result ? dgModel.SuccessDelete : dgModel.FailureDelete,
  });
};

module.exports = {
  getList: getList,
  create: create,
  update: update,
  remove: remove,
};
