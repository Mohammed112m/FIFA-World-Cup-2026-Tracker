const Event = require("../models/Event")



// const isAdmin = (req, res, next) => {
//   if (!req.user.isAdmin) {
//     return res.status(403).json({ message: "Access denied" })
//   }
//   next()
// }

////////////////first create new match////////////////////////

const createEvent = async (req, res) => {
  try {
    const { name, description, image, city, country, location, date, match } =
      req.body

    const event = await Event.create({
      name,
      description,
      image,
      city,
      country,
      location,
      date,
      match,
    })
    res.status(201).json(event)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error creation event" })
  }
}

//////////////// we get all events here ////////////////////////

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("match")
    res.json(events)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: " error get events" })
  }
}

////////////////get event by id ////////////////////////

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("match")
    if (!event) {
      return res.status(404).json({ message: "Event Not Found" })
    }
    res.json(event)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "error get event" })
  }
}

////////////////get event by city////////////////////////

const getEventByCity = async (req, res) => {
  try {
    const events = await Event.find({ city: req.params.city })

    res.json(events)
  } catch (error) {
    res.status(500).json({ message: "Error getting events " })
  }
}

////////////////we do update fo evert event we created////////////////////////

const updateEvent = async (req, res) => {
  try {
    const updateEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updateEvent) {
      return res.status(404).json({ message: "event not found " })
    }
    res.json(updateEvent)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "error updating event" })
  }
}

//////////////// delete event////////////////////////

const deleteEvent = async (req, res) => {
  try {
    const deleteEvent = await Event.findByIdAndDelete(req.params.id)
    if (!deleteEvent) {
      return res.status(404).json({ message: "event not found" })
    }
    res.json({ message: "Event Deleted Successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting event" })
  }
}

////////////////////////////////////////

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  getEventByCity,
  updateEvent,
  deleteEvent,
}
