import Event from "../models/Event.js";

// Create Event
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, price, seats } = req.body;

    const event = await Event.create({
      title,
      description,
      date,
      location,
      price,
      seats,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    console.log("Create Event Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get All Events
export const getAllEvents = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await Event.find({
      date: { $gte: today },
    }).sort({ date: 1 });

    res.json(events);
  } catch (error) {
    console.log("Get All Events Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this event" });
    }

    await event.deleteOne();

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log("Delete Event Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const deletePastEvents = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = await Event.deleteMany({
      date: { $lt: today },
    });

    res.status(200).json({
      message: "Past events deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.log("Delete Past Events Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
