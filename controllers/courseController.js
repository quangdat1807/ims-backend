const courseModel = require("../models/courseModel");
const statusCodes = require("http-status-codes");
const dotenv = require("dotenv");
dotenv.config();
const getList = async (req, res) => {
  const result = await courseModel.getList({});
  return res.status(statusCodes.OK).json({ data: result });
};

const details = async (req, res) => {
  const id = req.params.id;
  const results = await courseModel.getId({ idInternshipCourse: id });
  return res.status(statusCodes.OK).json({ data: results[0] });
};

const create = async (req, res) => {
  const { nameCoure, dateStart, dateEnd,status, kindOfInternship } = req.body;
  if (!nameCoure || !dateStart || !dateEnd || !kindOfInternship) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error:  courseModel.ERROR_EMPTY});
  }
  if (nameCoure.length > 255 || nameCoure.length < 6) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: courseModel.ERROR_LENGTH_NAMECOURE });
  }
  const reg = /^batch \d{1,}$/i;
  if(!reg.test(nameCoure)){
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: courseModel.ERROR_SPECIAL_CHARACTERS });
  }
  if (dateStart >= dateEnd) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error:  courseModel.ERROR_DATE});
  } 
  if (
    kindOfInternship !== courseModel.KOD_FULL_TIME &&
    kindOfInternship !== courseModel.KOD_PARTIAL_TIME
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: courseModel.ERROR_KINGOFINTERN });
  }
  if (
    status !== courseModel.STATUS_DONE &&
    status !== courseModel.STATUS_NAN &&
    status !== courseModel.STATUS_IN_PROGRESS
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: courseModel.ERROR_STATUS });
  }
  const course = await courseModel.getList({
    nameCoures: nameCoure,
  });
  if (course.length) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: courseModel.ERROR_BATCH });
  }
  const result = await courseModel.create({
    nameCoure: nameCoure,
    dateStart: dateStart,
    dateEnd: dateEnd,
    status: status,
    kindOfInternship: kindOfInternship,
  });
  if (!result) {
    return res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ error:  courseModel.ERROR_SERVER});
  }
  return res.status(statusCodes.OK).json({
    status: result,
    idInternshipCourse: result,
    message: "Thêm thành công",
  });
};

const update = async (req, res) => {
  const idInternshipCourse = req.params.id;
  const courseId = await courseModel.getList({
    idInternshipCourse: idInternshipCourse,
  });
  if (!courseId.length) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error:    courseModel.ERROR_COURSEID});
  }
  const {nameCoure, dateStart, dateEnd, status, kindOfInternship} = req.body;
  if (!nameCoure || !dateStart || !dateEnd || !status || !kindOfInternship) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: courseModel.ERROR_EMPTY });
  }
  if (nameCoure.length > 255 || nameCoure.length < 6) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: courseModel.ERROR_LENGTH_NAMECOURE});
  }
  if (dateStart >= dateEnd) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: courseModel.ERROR_DATE });
  }
  if (
    status !== courseModel.STATUS_DONE &&
    status !== courseModel.STATUS_NAN &&
    status !== courseModel.STATUS_IN_PROGRESS
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: courseModel.ERROR_STATUS });
  }
  if (
    kindOfInternship !== courseModel.KOD_FULL_TIME &&
    kindOfInternship !== courseModel.KOD_PARTIAL_TIME
  ) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: courseModel.ERROR_KINGOFINTERN });
  }
  const result = await courseModel.update({
    idInternshipCourse: idInternshipCourse,
    nameCoure: nameCoure,
    dateStart: dateStart,
    dateEnd: dateEnd,
    status: status,
    kindOfInternship: kindOfInternship,
  })
  return res.status(statusCodes.OK).json({
    status: result,
    message: courseModel.SUCCESS_UPDATE,
  });
};

const del = async (req, res) => {
  const idInternshipCourse = req.params.id;
  const courseId = await courseModel.getList({
    idInternshipCourse: idInternshipCourse, 
  });
  if (!courseId.length) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ error: courseModel.ERROR_COURSEID });
  }
  const result = await courseModel.delete({ idInternshipCourse: idInternshipCourse });
  return res.status(statusCodes.OK).json({
    status: result,
    message: courseModel.SUCCESS_DEL,
  });
};

module.exports = {
  getList: getList,
  details: details,
  update: update,
  create: create,
  del: del,
};