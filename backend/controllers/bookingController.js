import Booking from "../models/Booking.js";
import Event from "../models/Event.js";

// Create Booking
export const createBooking = async (req, res) => {
  try {
    console.log("Incoming booking:", req.body);
    console.log("User:", req.user);

    const { eventId, tickets } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.bookedSeats + tickets > event.seats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    const totalAmount = event.price * tickets;

    const booking = await Booking.create({
      user: req.user._id,
      event: event._id,
      tickets,
      totalAmount,
    });

    event.bookedSeats += tickets;
    await event.save();

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    console.log("Booking Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get logged-in user's bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("event");

    res.status(200).json(bookings);
  } catch (error) {
    console.log("Fetch Booking Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Cancel Booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 🔥 event update (seats wapas add karo)
    const event = await Event.findById(booking.event);

    if (event) {
      event.bookedSeats -= booking.tickets;
      await event.save();
    }

    await booking.deleteOne();

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
