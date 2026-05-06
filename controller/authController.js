const bcrypt = require("bcrypt") // this protect password
const jwt = require("jsonwebtoken") // this for check user
const User = require("../models/User")

////////////////////////////////////////


const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "Email already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })
    res.status(201).json(newUser)
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
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid" })
    }

    const payload = {
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
  }
}

module.exports = { signUp, SingIn }
