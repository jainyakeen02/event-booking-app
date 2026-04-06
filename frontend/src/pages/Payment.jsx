import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const { eventId, eventTitle, tickets, totalAmount } = location.state || {};

  const [cardData, setCardData] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/bookings",
        { eventId, tickets },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Payment Successful and Booking Confirmed");
      navigate("/my-bookings");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Payment / Booking Failed");
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
              Secure Checkout
            </span>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight text-white">
              Complete Your
              <span className="block bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Event Payment
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base md:text-lg leading-7 text-gray-300">
              Review your booking details and confirm your event reservation
              with a smooth premium checkout experience.
            </p>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 -mt-12 pb-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Summary */}
          <div className="xl:col-span-4">
            <div className="rounded-[30px] bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0f172a] p-6 text-white shadow-[0_18px_60px_rgba(15,23,42,0.18)]">
              <p className="text-sm font-medium text-gray-300">Booking Summary</p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-wider text-gray-300">
                    Event Name
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-white">
                    {eventTitle || "No Event Selected"}
                  </h3>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-wider text-gray-300">
                    Tickets
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    {tickets || 0}
                  </h3>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-wider text-gray-300">
                    Total Amount
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-red-300">
                    ₹ {totalAmount || 0}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="xl:col-span-8">
            <div className="rounded-[30px] border border-white/60 bg-white/85 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.10)] backdrop-blur-xl md:p-8">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-red-600">
                  Payment Form
                </p>
                <h2 className="mt-1 text-3xl font-bold text-gray-900 md:text-4xl">
                  Enter Card Details
                </h2>
                <p className="mt-2 text-gray-500">
                  Fill your payment information to confirm the booking.
                </p>
              </div>

              <form onSubmit={handlePayment} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Card Holder Name
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Enter card holder name"
                    value={cardData.cardName}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Enter card number"
                    value={cardData.cardNumber}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      CVV
                    </label>
                    <input
                      type="password"
                      name="cvv"
                      placeholder="Enter CVV"
                      value={cardData.cvv}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-[#f9fafb] px-4 py-3.5 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                      required
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-red-50 border border-red-100 px-4 py-4">
                  <p className="text-sm font-medium text-red-600">
                    You are paying <span className="font-bold">₹ {totalAmount || 0}</span> for{" "}
                    <span className="font-bold">{tickets || 0}</span> ticket(s).
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-pink-600 py-3.5 text-sm font-bold tracking-wide text-white transition hover:from-red-700 hover:to-pink-700 shadow-lg shadow-red-200"
                  >
                    Pay Now
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

export default Payment;
