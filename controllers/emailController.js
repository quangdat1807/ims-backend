const emailModel = require("../models/email");
const statusCodes = require("http-status-codes");
const emailController = {
  sendMail: async (req, res) => {
    const emailRegex =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*.?[a-zA-Z0-9])*.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    const {
      subject,
      interviewer,
      emailInterviewer,
      interviewDate,
      interviewTime,
      interviewLink,
      listCandidates,
    } = req.body;
    console.log(subject,
      listCandidates,
      emailInterviewer,
      interviewLink,
      interviewDate,
      interviewTime,
      interviewer)
    if (
      !subject ||
      !emailInterviewer ||
      !interviewLink ||
      !interviewDate ||
      !interviewTime ||
      !interviewer
    ) {
      return res.status(400).json({ error: emailModel.sendMail.Error });
    }

    if (!emailRegex.test(emailInterviewer)) {
      return res.status(statusCodes.BAD_REQUEST).json({
        error: emailModel.sendMail.ErrorEmail,
      });
    }
    if (interviewLink.length < 10 || interviewLink.length > 255) {
      return res.status(statusCodes.BAD_REQUEST).json({
        error: emailModel.sendMail.ErrorInterviewLink,
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
        error: emailModel.sendMail.ErrorInterviewDate,
      });
    }

    if (interviewer.length < 0 || interviewer.length > 255) {
      return res.status(statusCodes.BAD_REQUEST).json({
        error: emailModel.sendMail.ErrorInterviewer,
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
        .json({ error: emailModel.sendMail.ErrorSpecialChars });
    }
    // add person interview to array with candidate.
    listCandidates.push({
      emailCandidate: emailInterviewer,
      fullName: interviewer,
    });

    const sendMail = await emailModel.sendMail(
      subject,
      listCandidates,
      emailInterviewer,
      interviewLink,
      interviewDate,
      interviewTime,
      interviewer
    );
    console.log(
      subject,
      listCandidates,
      emailInterviewer,
      interviewLink,
      interviewDate,
      interviewTime,
      interviewer
    );
    if (sendMail) {
      return res
        .status(200)
        .json({ message: emailModel.sendMail.SuccessMessage });
    }
    return res
      .status(400)
      .json({ message: emailModel.sendMail.FailureMessage });
  },
};
module.exports = emailController;