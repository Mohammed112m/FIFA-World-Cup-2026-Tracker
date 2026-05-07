const User = require("../models/User")

///////////////////////////////////////

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).send(users)
  } catch (error) {
    res.status(500).send({ status: "error", message: " error Users" })
  }
}

////////////////////////////////////////

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" })
    }
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: "error", message: "Error getting user" })
  }
}

////////////////////////////////////////

const updateUser = async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updateUser) {
      return res
        .status(404)
        .send({ status: " error", message: "User Not Found " })
    }
    res.status(200).send(updateUser)
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: "error", message: "error Updating user" })
  }
}

////////////////////////////////////////

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id)
    if (!deleteUser) {
      return res
        .status(404)
        .send({ status: "error", message: " User Not Found" })
    }
    res
      .status(200)
      .send({ status: "Success", message: " User delete Successfully" })
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: "error", message: "error Delete User" })
  }
}

////////////////////////////////////////

module.exports = { getAllUsers, getUserById, updateUser, deleteUser }
