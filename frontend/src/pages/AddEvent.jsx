import { useState } from "react";
import axios from "axios";

function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    seats: "",
    price: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("date", formData.date);
      formDataToSend.append("seats", formData.seats);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("image", image);

      await axios.post("http://localhost:5000/api/events", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Event added successfully");

      setFormData({
        title: "",
        description: "",
        location: "",
        date: "",
        seats: "",
        price: "",
      });
      setImage(null);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to add event");
    }
  };

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
              Create New Event
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight text-white">
              Add Your
              <span className="block bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Next Big Event
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base md:text-lg leading-7 text-gray-300">
              Publish concerts, workshops, college fests, and more with a clean
              premium event creation experience.
            </p>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 -mt-12 pb-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Info Panel */}
          <div className="xl:col-span-4">
            <div className="rounded-[30px] bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0f172a] p-6 text-white shadow-[0_18px_60px_rgba(15,23,42,0.18)]">
              <p className="text-sm font-medium text-gray-300">Publishing Tips</p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">Event Title</p>
                  <p className="mt-2 text-sm text-gray-300">
                    Keep the title short, clear, and catchy.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">Event Image</p>
                  <p className="mt-2 text-sm text-gray-300">
                    Upload a good quality poster or banner to attract users.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-sm font-semibold text-white">Seats & Pricing</p>
                  <p className="mt-2 text-sm text-gray-300">
                    Double-check available seats and price before publishing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="xl:col-span-8">
            <div className="rounded-[30px] border border-white/60 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-8">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
                  Event Form
                </p>
                <h2 className="mt-1 text-3xl font-bold text-gray-900 md:text-4xl">
                  Add Event Details
                </h2>
                <p className="mt-2 text-gray-500">
                  Fill all required details and publish your event.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Event Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter event title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Event Description
                    </label>
                    <textarea
                      name="description"
                      placeholder="Write event description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="5"
                      className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100 resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      placeholder="Enter location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Total Seats
                    </label>
                    <input
                      type="number"
                      name="seats"
                      placeholder="Enter total seats"
                      value={formData.seats}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Ticket Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="Enter price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Event Image
                    </label>

                    <div className="rounded-2xl border border-dashed border-gray-300 bg-[#f9fafb] p-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full text-sm text-gray-600 file:mr-4 file:rounded-full file:border-0 file:bg-red-50 file:px-4 file:py-2 file:font-semibold file:text-red-600 hover:file:bg-red-100"
                      />

                      {image && (
                        <p className="mt-3 text-sm font-medium text-gray-700">
                          Selected: <span className="text-red-600">{image.name}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-pink-600 py-3.5 text-sm font-bold tracking-wide text-white transition hover:from-red-700 hover:to-pink-700 shadow-lg shadow-red-200"
                  >
                    Add Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEvent;
