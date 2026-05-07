const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

////////////////////////////////////////

const express = require("express")
const app = express()
const http = require("http")
const { Server } = require("socket.io")
const logger = require("morgan")
const cors = require("cors")

require("dotenv").config()
require("./db")

const PORT = process.env.PORT || 3229

////////////////////////////////////////
const authRouter = require("./routes/authRouter")
const userRouter = require("./routes/userRouter")
const matchRouter = require("./routes/matchRouter")
const eventRouter = require("./routes/eventRouter")
const messageRouter = require("./routes/messageRouter")
const stadiumRouter = require("./routes/stadiumRouter")
const teamRouter = require('./routes/teamRouter')

////////////////////////////////////////

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

////////////////////////////////////////

app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/match", matchRouter)
app.use("/event", eventRouter)
app.use("/message", messageRouter)
app.use("/stadium", stadiumRouter)
app.use('/team',teamRouter)

////////////////////////////////////////

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
  },
})

////////////////////////////////////////

io.on("connection", (socket) => {
  console.log("⚡ User connected:", socket.id)

  socket.on("sendMessage", (data) => {
    io.emit("receiveMessage", data)
  })

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id)
  })
})

////////////////////////////////////////

app.get("/", (req, res) => {
  res.send(" My Web Page server is running")
})

////////////////////////////////////////

server.listen(PORT, () => {
  console.log(`⚽ My Web Page server running on port ${PORT}`)
})
