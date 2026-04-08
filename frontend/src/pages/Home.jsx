import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [ticketCounts, setTicketCounts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log("Fetch error:", err));
  }, []);

  const handleTicketChange = (eventId, value) => {
    setTicketCounts({
      ...ticketCounts,
      [eventId]: value,
    });
  };

  const handleBooking = (event) => {
    const tickets = Number(ticketCounts[event._id]) || 1;
    const totalAmount = event.price * tickets;

    navigate("/payment", {
      state: {
        eventId: event._id,
        eventTitle: event.title,
        tickets,
        totalAmount,
      },
    });
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Event deleted successfully");
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.log("Delete Event Error:", error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setMaxPrice("");
    setSelectedDate("");
  };

  const scrollToEventsSection = () => {
    const section = document.getElementById("events-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFilterEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      scrollToEventsSection();
    }
  };

  const areAllFiltersEmpty =
    searchTerm.trim() === "" && maxPrice === "" && selectedDate === "";

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      searchTerm.trim() === "" ||
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      maxPrice === "" || Number(event.price) <= Number(maxPrice);

    const matchesDate =
      selectedDate === "" ||
      new Date(event.date).toISOString().split("T")[0] === selectedDate;

    return matchesSearch && matchesPrice && matchesDate;
  });

  const matchedCount = areAllFiltersEmpty ? 0 : filteredEvents.length;

  const displayedEvents = areAllFiltersEmpty ? events : filteredEvents;

  const stats = useMemo(() => {
    const locations = new Set(events.map((event) => event.location));
    const prices = events
      .map((event) => Number(event.price))
      .filter((price) => !isNaN(price));
    const minPrice = prices.length ? Math.min(...prices) : 0;

    return {
      totalEvents: events.length,
      totalCities: locations.size,
      startingPrice: minPrice,
    };
  }, [events]);

  const quickTags = [
    "Music Shows",
    "Comedy Nights",
    "College Fest",
    "Workshops",
    "Tech Events",
    "Live Concerts",
  ];

  const promoCards = [
    {
      title: "Live Concerts",
      subtitle: "Feel the music live",
      bg: "from-[#1d4ed8] to-[#312e81]",
    },
    {
      title: "Stand-Up Comedy",
      subtitle: "Laugh out loud tonight",
      bg: "from-[#dc2626] to-[#be185d]",
    },
    {
      title: "Workshops",
      subtitle: "Learn with real experts",
      bg: "from-[#0f766e] to-[#065f46]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#09111f] via-[#111827] to-[#1f2937]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.18),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_24%)]"></div>
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"></div>
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-28 md:pt-24 md:pb-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm font-medium text-red-200 backdrop-blur-md">
              Premium Event Booking Experience
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight text-white">
              Discover Amazing Events
              <span className="block bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Around You
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base md:text-lg leading-7 text-gray-300">
              Search trending events, filter easily, and book your seats with a
              smooth and modern user experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {quickTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-gray-200 backdrop-blur-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Promo Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 -mt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {promoCards.map((card) => (
            <div
              key={card.title}
              className={`rounded-[28px] bg-gradient-to-br ${card.bg} p-6 text-white shadow-[0_18px_50px_rgba(15,23,42,0.18)]`}
            >
              <p className="text-sm text-white/80">Featured Category</p>
              <h3 className="mt-3 text-2xl font-bold">{card.title}</h3>
              <p className="mt-2 text-sm text-white/80">{card.subtitle}</p>
              <div className="mt-6 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                Explore Now
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats + Filter */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-3">
            <div className="h-full rounded-[30px] bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0f172a] p-5 text-white shadow-[0_18px_60px_rgba(15,23,42,0.18)]">
              <p className="text-sm font-medium text-gray-300">
                Platform Highlights
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-wider text-gray-300">
                    Total Events
                  </p>
                  <h3 className="mt-1 text-2xl font-bold">{stats.totalEvents}</h3>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-wider text-gray-300">
                    Locations
                  </p>
                  <h3 className="mt-1 text-2xl font-bold">{stats.totalCities}</h3>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-wider text-gray-300">
                    Starting From
                  </p>
                  <h3 className="mt-1 text-2xl font-bold">₹ {stats.startingPrice}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-9">
            <div className="rounded-[30px] border border-white/60 bg-white/85 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-6">
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Find Your Next Event
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Search and filter events by title, location, price, and date
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
                    {matchedCount} event{matchedCount !== 1 ? "s" : ""} matched
                  </div>

                  <button
                    onClick={clearFilters}
                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:text-red-600"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Search Event
                  </label>
                  <input
                    type="text"
                    placeholder="Search by title or location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleFilterEnter}
                    className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Maximum Price
                  </label>
                  <input
                    type="number"
                    placeholder="Enter max price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    onKeyDown={handleFilterEnter}
                    className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    onKeyDown={handleFilterEnter}
                    className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Strip */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex flex-wrap items-center gap-3 rounded-[28px] border border-gray-100 bg-white px-5 py-4 shadow-sm">
          <span className="text-sm font-bold text-gray-900">
            Featured Right Now:
          </span>
          {quickTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Events */}
      <div id="events-section" className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
            Explore
          </p>
          <h2 className="mt-1 text-3xl font-bold text-gray-900 md:text-4xl">
            Trending Events
          </h2>
          <p className="mt-2 text-gray-500">
            Browse all available events with a premium booking experience
          </p>
        </div>

        {displayedEvents.length === 0 ? (
          <div className="rounded-[30px] border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl">
              🎟
            </div>
            <h3 className="text-2xl font-bold text-gray-800">No events found</h3>
            <p className="mt-2 text-gray-500">
              Try changing your search term, date, or price range.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {displayedEvents.map((event) => {
              const remainingSeats = event.seats - event.bookedSeats;
              const isSoldOut = remainingSeats <= 0;

              return (
                <div
                  key={event._id}
                  className="group overflow-hidden rounded-[30px] border border-gray-100 bg-white shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
                >
                  <div className="relative overflow-hidden">
                    {event.image ? (
                      <img
                        src={`http://localhost:5000${event.image}`}
                        alt={event.title}
                        className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-60 w-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400"></div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    <div className="absolute left-4 top-4 flex gap-2">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-red-600 shadow-lg">
                        Featured
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold shadow-lg ${
                          isSoldOut
                            ? "bg-gray-200 text-gray-700"
                            : "bg-black/60 text-white backdrop-blur-md"
                        }`}
                      >
                        {isSoldOut ? "Sold Out" : `${remainingSeats} Seats Left`}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="line-clamp-1 text-2xl font-bold text-white">
                        {event.title}
                      </h3>
                      <p className="mt-1 line-clamp-1 text-sm text-gray-200">
                        📍 {event.location}
                      </p>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="min-h-[48px] line-clamp-2 text-sm leading-6 text-gray-600">
                      {event.description}
                    </p>

                    <div className="mt-5 rounded-2xl bg-gray-50 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-medium text-gray-500">
                            Event Date
                          </p>
                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {new Date(event.date).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs font-medium text-red-500">
                            Starting At
                          </p>
                          <p className="mt-1 text-xl font-bold text-red-600">
                            ₹ {event.price}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-white px-4 py-3">
                          <p className="text-xs font-medium text-gray-500">
                            Total Seats
                          </p>
                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {event.seats}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-white px-4 py-3">
                          <p className="text-xs font-medium text-gray-500">
                            Remaining
                          </p>
                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {remainingSeats}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <label className="mb-2 block text-sm font-semibold text-gray-700">
                        Number of Tickets
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={remainingSeats}
                        placeholder="Enter tickets"
                        value={ticketCounts[event._id] || ""}
                        onChange={(e) =>
                          handleTicketChange(event._id, e.target.value)
                        }
                        className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3 text-gray-700 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
                        disabled={isSoldOut}
                      />
                    </div>

                    <div className="mt-5 flex flex-col gap-3">
                      <button
                        onClick={() => handleBooking(event)}
                        disabled={isSoldOut}
                        className={`w-full rounded-2xl py-3.5 text-sm font-bold tracking-wide text-white transition ${
                          isSoldOut
                            ? "cursor-not-allowed bg-gray-400"
                            : "bg-gradient-to-r from-red-600 to-pink-600 shadow-lg shadow-red-200 hover:from-red-700 hover:to-pink-700"
                        }`}
                      >
                        {isSoldOut ? "Sold Out" : "Book Now"}
                      </button>

                      {event.createdBy === userId && (
                        <button
                          onClick={() => handleDeleteEvent(event._id)}
                          className="w-full rounded-2xl border border-red-200 bg-red-50 py-3.5 text-sm font-bold text-red-600 transition hover:bg-red-100"
                        >
                          Delete Event
                        </button>
                      )}
                    </div>
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

export default Home;
