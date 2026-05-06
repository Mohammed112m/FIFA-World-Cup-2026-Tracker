const bcrypt = require("bcrypt") // this protect password
const jwt = require("jsonwebtoken") // // token here for user no need  to  do signIn every time
const User = require("../models/User")

////////////////////////////////////////


const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "Email already exists" })// ( 400 ) bad request , user send wrong data
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })
    res.status(201).json(newUser) // (201) means Create , done create we do it when create user,product .
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: " Sing up error" })
  }
}

////////////////////////////////////////

const SingIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid" })
    }// (401) Unauthorized

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid" })
    }

    const payload = {// payload the data inside token
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    }

    const token = jwt.sign(payload, process.env.APP_SECRET)
    res.json({ token, user: payload })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Sign In error" })
  } // ( 500 ) server Error
}

module.exports = { signUp, SingIn }
