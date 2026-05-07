const Message = require("../models/Message")
const { getIO } = require("../socket") // ...

const io = getIO()
//////////////////// create new message ////////////////////

const createMessage = async (req, res) => {
  try {
    const { content } = req.body

    const message = await Message.create({
      user: req.user.id,
      content,
    })

    const populatedMessage = await message.populate("user", "name")

    const io = getIO()
    io.emit("receiveMessage", populatedMessage)

    res.status(201).json(populatedMessage)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error creating message" })
  }
}

//////////////////// we get all message ////////////////////

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate("user", "name email")
      // this do the new message first
      .sort({ created_at: -1 })
    res.json(messages)
  } catch (error) {
    console.log(error)
    ;(res, status(500).json({ message: "error get message" }))
  }
}

//////////////////// get message by id ////////////////////

const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).populate(
      "user",
      "name email"
    )

    if (!message) {
      return res.status(404).json({ message: "message not found" })
    }
    res.json(message)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "error get message" })
  }
}

//////////////////// delete message ////////////////////

const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)

    if (!message) {
      return res.status(404).json({ message: "Message not found" })
    }

    // this allows to user delete his message or admin delete message

    if (message.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Not authorized" })
    }

    await Message.findByIdAndDelete(req.params.id)

    res.json({ message: "Message deleted successfully" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error deleting message" })
  }
}

////////////////////////////////////////////////////////

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
}
