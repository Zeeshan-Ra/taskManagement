const router = require("express").Router();
const User = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//SIGNUP API
router.post("/signup", async (req, resp) => {
    try {
        const { username } = req.body;
        const { email } = req.body;
        const existingUser = await User.findOne({ username: username });
        const existingEmail = await User.findOne({ email: email });
        if (existingUser) {
            return resp.status(400).json({ message: "Username already exists" });
        } else if (username.length < 6) {
            return resp.status(400).json({ message: "Username should have atleast 6 characters" });
        }
        if (existingEmail) {
            return resp.status(400).json({ message: "Email already exists" });
        }
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({ username: req.body.username, email: req.body.email, password: hashPassword, });
        await newUser.save();
        return resp.status(200).json({ message: "SignIn successfully" })
    } catch (error) {
        console.log(error);
        resp.status(400).json({ message: "Internal Server Error" });
    }
});

//LOGIN API
router.post("/login", async (req, resp) => {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
        return resp.status(400).json({ message: "Invalid Credentials" });
    }
    bcrypt.compare(password, existingUser.password, (err, data) => {
        if (data) {
            const authClaims = [{ name: username }, {jti: jwt.sign({}, "zeeTM")}]
            const token = jwt.sign({ authClaims }, "zeeTM", { expiresIn: "2d" });
            resp.status(200).json({id: existingUser._id, token: token})
        } else {
            return resp.status(400).json({ message: "Invalid Credentials" });
        }
    })
})

module.exports = router;