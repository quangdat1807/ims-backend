const nodeMailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const sendMail = async (
  subject,
  listCandidates,
  emailInterviewer,
  interviewLink,
  interviewDate,
  interviewTime,
  interviewer
) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.mailHost,
    port: process.env.mailPort,
    secure: true,
    auth: {
      user: process.env.adminEmail,
      pass: process.env.adminPassword,
    },
  });

  dateTime = (interviewDate + "T" + interviewTime + ":00.000Z").replace(
    /[^\w\s]/gi,
    ""
  );

  let content =
    "BEGIN:VCALENDAR\n" +
    "VERSION:2.0\n" +
    "BEGIN:VEVENT\n" +
    "SUMMARY:Meeting\n" +
    `DTSTART;VALUE=DATE:${dateTime}` +
    "LOCATION:TMA SoLutions \n" +
    "DESCRIPTION:Description123\n" +
    "STATUS:CONFIRMED\n" +
    "SEQUENCE:3\n" +
    "BEGIN:VALARM\n" +
    "TRIGGER:-PT10M\n" +
    "DESCRIPTION:Description123\n" +
    "ACTION:DISPLAY\n" +
    "END:VALARM\n" +
    "END:VEVENT\n" +
    "END:VCALENDAR";

  const options = (
    subject,
    listMail,
    namePersonInterview,
    emailPersonInterview,
    emailCandidate,
    fullName
  ) => {
    return {
      from: process.env.adminEmail,
      to: emailCandidate,
      subject: subject,
      html: `<h3 style="color: red;"> Xin chào ${fullName}</h3>
    <p>Như đã qua trao đổi bằng điện thoại, chúng tôi xin mời bạn đến với cuộc phỏng vấn chi tiết với trưởng dự án bằng link dưới đây.</p>
    <ul>
      <li>Ngày phỏng vấn: ${interviewDate}</li>
      <li>Thời gian phỏng vấn: ${interviewTime}</li>
      <li>Link phỏng vấn: <a href=${interviewLink}>${interviewLink}</a></li>
      <li>
      ${
        emailPersonInterview === emailCandidate && listMail
          ? `Danh sách email người phỏng vấn: ${listMail.map(
              (element, index) => {
                if (element.emailCandidate !== emailPersonInterview) {
                  return ` <a href="#">${element.emailCandidate}</a>`;
                }
              }
            )}`
          : `
            <li>
          Tên người phỏng vấn: <a href="#">${namePersonInterview}</a>
        </li>
          <li>
          Email người phỏng vấn: <a href="#">${emailPersonInterview}</a>
        </li>`
      } 
    </ul>
    <p>Vui lòng xác nhận nếu bạn nhận được email này. Nếu bạn có bất kì câu hỏi nào, chỉ cần liên hệ với chúng tôi qua.<br>
      Hotline: <a href="#">0977.465.083</a>
      <br>
      Email: intern-binhdinh@tma.com.vn | Website: www.tma-binhdinh.vn
    </p>
  `,
      icalEvent: {
        contentType:
          "text/calendar; method=REQUEST; name='meeting.ics';component=VEVENT",
        content: content,
        contentEncoding: "Base64",
        "Content-Class": "urn:content-classes:calendarmessage",
      },
    };
  };

  try {
    await listCandidates.map((item, index) => {
      const opt = options(
        subject,
        listCandidates,
        interviewer,
        emailInterviewer,
        item.emailCandidate,
        item.fullName
      );

      transporter.sendMail(opt, function (error, info) {
        if (error) {
          console.error(error);
          throw Error("Send mail error");
        }
      });
    });
  } catch (error) {
    return false;
  }
  return true;
};

sendMail.Error = "Bạn cần nhập đầy đủ thông tin";
sendMail.ErrorEmail = "Email người phỏng vấn không hợp lệ";
sendMail.ErrorInterviewLink = "Link phỏng vấn không đủ chiều dài";
sendMail.ErrorInterviewDate = "Ngày phỏng vấn không thể nhỏ hơn ngày hiện tại";
sendMail.ErrorInterviewer = "Cần điền đầy đủ họ tên";
sendMail.ErrorSpecialChars =
  "Tên người phỏng vấn không được chứa ký tự đặt biệt";
sendMail.SuccessMessage = "Gửi mail thành công";
sendMail.FailureMessage = "Gửi mail thất bại";

module.exports = {
  sendMail: sendMail,
};