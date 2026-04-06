import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("My Bookings API Response:", res.data);
      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Booking cancelled successfully");
      fetchBookings();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Cancel failed");
    }
  };

  const stats = useMemo(() => {
    const totalBookings = bookings.length;
    const totalSpent = bookings.reduce(
      (sum, booking) => sum + Number(booking.totalAmount || 0),
      0
    );
    const totalTickets = bookings.reduce(
      (sum, booking) => sum + Number(booking.tickets || 0),
      0
    );

    return {
      totalBookings,
      totalSpent,
      totalTickets,
    };
  }, [bookings]);

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#09111f] via-[#111827] to-[#1f2937]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.18),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_24%)]"></div>
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"></div>
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-20 md:pb-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm font-medium text-red-200 backdrop-blur-md">
              Your Booking Dashboard
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight text-white">
              Manage Your
              <span className="block bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Booked Events
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base md:text-lg leading-7 text-gray-300">
              View your booked events, track ticket details, and cancel bookings
              anytime with a clean premium interface.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-[28px] bg-gradient-to-br from-[#dc2626] to-[#be185d] p-6 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
            <p className="text-sm text-white/80">Total Bookings</p>
            <h3 className="mt-3 text-3xl font-bold">{stats.totalBookings}</h3>
            <p className="mt-2 text-sm text-white/80">Events you have booked</p>
          </div>

          <div className="rounded-[28px] bg-gradient-to-br from-[#1d4ed8] to-[#312e81] p-6 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
            <p className="text-sm text-white/80">Total Tickets</p>
            <h3 className="mt-3 text-3xl font-bold">{stats.totalTickets}</h3>
            <p className="mt-2 text-sm text-white/80">Seats reserved by you</p>
          </div>

          <div className="rounded-[28px] bg-gradient-to-br from-[#0f766e] to-[#065f46] p-6 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
            <p className="text-sm text-white/80">Total Spent</p>
            <h3 className="mt-3 text-3xl font-bold">₹ {stats.totalSpent}</h3>
            <p className="mt-2 text-sm text-white/80">Amount paid for bookings</p>
          </div>
        </div>
      </div>

      {/* Booking List */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
            My Activity
          </p>
          <h2 className="mt-1 text-3xl font-bold text-gray-900 md:text-4xl">
            My Bookings
          </h2>
          <p className="mt-2 text-gray-500">
            All your confirmed bookings in one place
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="rounded-[30px] border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl">
              🎫
            </div>
            <h3 className="text-2xl font-bold text-gray-800">No bookings found</h3>
            <p className="mt-2 text-gray-500">
              Once you book an event, it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {bookings.map((booking) => {
              const eventDate = booking.event?.date
                ? new Date(booking.event.date)
                : null;

              const formattedDate = eventDate
                ? eventDate.toLocaleDateString()
                : "N/A";

              const isPastEvent = eventDate ? eventDate < new Date() : false;

              return (
                <div
                  key={booking._id}
                  className="overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
                >
                  {/* Top Banner */}
                  <div className="relative bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#0f172a] px-5 py-6">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.22),transparent_28%)]"></div>

                    <div className="relative flex items-start justify-between gap-3">
                      <div>
                        <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-red-200 backdrop-blur-md">
                          {isPastEvent ? "Past Event" : "Confirmed Booking"}
                        </span>

                        <h3 className="mt-3 text-2xl font-bold text-white line-clamp-2">
                          {booking.event?.title || "Untitled Event"}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="rounded-2xl bg-gray-50 p-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-white px-4 py-3">
                          <p className="text-xs font-medium text-gray-500">Event Date</p>
                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {formattedDate}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-white px-4 py-3">
                          <p className="text-xs font-medium text-gray-500">Tickets</p>
                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {booking.tickets}
                          </p>
                        </div>

                        <div className="col-span-2 rounded-2xl bg-white px-4 py-3">
                          <p className="text-xs font-medium text-red-500">Total Amount</p>
                          <p className="mt-1 text-2xl font-bold text-red-600">
                            ₹ {booking.totalAmount}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="mt-5 w-full rounded-2xl border border-red-200 bg-red-50 py-3.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
