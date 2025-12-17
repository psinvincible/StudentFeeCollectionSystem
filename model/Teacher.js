const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/authentication");

const teacherSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
        },
        role: {
            type: String,
            enum: ["TEACHER", "ADMIN"],
            default: "TEACHER",
        }
    },{timestamps: true},
)

teacherSchema.pre("save", function (next){
    const teacher = this;

    if(!teacher.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt).update(teacher.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;
});

teacherSchema.static("matchPasswordAndGenerateToken", async function(email, password){
    const teacher = await this.findOne({email});

    if(!teacher) throw new Error("User not found!");

    const salt = teacher.salt;
    const hashedPassword = teacher.password;

    const userProvidedHash = createHmac("sha256", salt).update(password).digest("hex");

    if(hashedPassword != userProvidedHash) throw new Error("Incorrect Password!");

    const token = createTokenForUser(teacher);
    return token;
})

const Teacher = mongoose.model("teacher", teacherSchema);

module.exports = Teacher;