require("dotenv").config();

const express = require("express");
const path = require("path");
const feeRoute = require("./routes/feeRoute");
const studentRoute = require("./routes/studentRoute");
const userRoute = require("./routes/userRoute");
const enquiryRoute = require("./routes/enquiryRoute");
const adminRoute = require("./routes/adminRoute");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication")
const { requireLogin } = require("./middlewares/auth")

mongoose.connect("mongodb://localhost:27017/sfcs").then((e) => console.log("MongoDB Connected."));

const app = express();
const PORT = 3002;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))


app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

//here we are setting locals.user for every request;
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {    
    res.render("home", {
        user: req.user,
    });
});

app.use("/fee", requireLogin, feeRoute);
app.use("/student", requireLogin, studentRoute);
app.use("/user", userRoute);
app.use("/enquiry", enquiryRoute);
app.use("/admin", adminRoute);

app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(PORT, () => {
    console.log(`App is listening on:- http://localhost:${PORT}`);
})