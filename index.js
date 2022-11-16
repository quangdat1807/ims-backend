const express = require("express");
const app = express();
const dotenv = require("dotenv");

const cors = require("cors");

app.use(cors());
const { requireToken } = require("./middleware/index");

const authRoute = require("./routers/auth");
const courseRoute = require("./routers/course");
const candidate = require("./routers/candidate");
const email = require("./routers/email");
const mentor = require("./routers/mentor");
const importCandidate = require("./routers/import");
const dg = require("./routers/dg");
const internview = require("./routers/internview");
const internship = require("./routers/internship");
dotenv.config();
const port = process.env.PORT;
global.__basedir = __dirname + "/..";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.use(authRoute);
app.use(requireToken, courseRoute);
app.use(requireToken, candidate);
app.use(requireToken, mentor);
app.use(requireToken, importCandidate);
app.use(requireToken, email);
app.use(requireToken, internview);
app.use(requireToken, dg);
app.use(requireToken, internship);
app.listen(port, () => {
  console.log("App start success");
});
