"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

// === Types ===
type FormState = {
  name: string;
  email: string;
  phone: string;
  shootType: string;
  date: string;
  message: string;
};

type RateCardItem = {
  title: string;
  desc: string;
  price: string;
};

type FormInputProps = {
  label: string;
  field: keyof FormState;
  type: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
};

// === Reusable Input Component (moved outside to prevent re-render issues) ===
const FormInput = React.memo(
  ({
    label,
    field,
    type,
    required = true,
    value,
    onChange,
  }: FormInputProps) => (
    <div>
      <label className="text-sm text-[#CCCCCC] block mb-1">{label}</label>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg p-3 bg-[#1c1c1c] text-white border border-white/10 
                   focus:border-[#FF3100] focus:ring-1 focus:ring-[#FF3100] outline-none transition"
      />
    </div>
  )
);
FormInput.displayName = "FormInput";

// === Main Component ===
export default function FullRateCard() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    shootType: "Basic Event Coverage",
    date: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const updateFormField = useCallback(
    (field: keyof FormState, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSent(false);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSent(true);
        setForm({
          name: "",
          email: "",
          phone: "",
          shootType: "Basic Event Coverage",
          date: "",
          message: "",
        });
      } else {
        const json = await res.json();
        alert(`Failed to send: ${json.error || "Unknown error"}`);
      }
    } catch (error) {
      alert("Network error sending message.");
    } finally {
      setLoading(false);
      setTimeout(() => setSent(false), 2000);
    }
  }

  const rateCards: RateCardItem[] = [
    {
      title: "Basic Event Package",
      price: "$1500",
      desc: "5–6 hours coverage, 1 camera, highlight video and speeches",
    },
    {
      title: "Mid-Tier Event Package",
      price: "$3500",
      desc: "8–10 hours, two cameras, highlight + full video",
    },
    {
      title: "High-End Event Package",
      price: "$6500+",
      desc: "Full day + prep, multiple cameras, drone, premium editing, extras",
    },
    {
      title: "Small Event / Short Shoot",
      price: "$1200",
      desc: "1–3 hrs, 1 camera, 1 highlight reel",
    },
    {
      title: "Corporate / Promo Video",
      price: "$2000–$5000+",
      desc: "Script/planning, multiple cameras, full edit, travel costs",
    },
    {
      title: "Hourly Rate",
      price: "$200/hr",
      desc: "Smaller jobs or incremental work (editing, extra shooting)",
    },
    {
      title: "Additional Reels",
      price: "$200",
      desc: "",
    },
  ];

  return (
    <section
      id="booking"
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 md:px-12 py-24"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* === Rate Card Section === */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          <h2 className="text-3xl font-bold text-[#FF3100] mb-4">
            Rates & Booking
          </h2>
          <p className="text-[#CCCCCC] mb-6">
            Detailed packages, add-ons, and custom quotes available — fill the
            form to start the conversation.
          </p>

          <div className="space-y-4">
            {rateCards.map(({ title, desc, price }) => (
              <div
                key={title}
                className="rounded-xl p-4 bg-black/30 border border-white/10"
              >
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="text-sm text-[#CCCCCC]">
                  {desc} —{" "}
                  <strong className="text-[#FF3100] font-semibold">
                    {price}
                  </strong>
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* === Booking Form Section === */}
        <div className="rounded-2xl p-6 bg-black/30 backdrop-blur-sm border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Book a Session</h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <FormInput
              label="Name"
              field="name"
              type="text"
              value={form.name}
              onChange={(value) => updateFormField("name", value)}
            />

            <FormInput
              label="Email"
              field="email"
              type="email"
              value={form.email}
              onChange={(value) => updateFormField("email", value)}
            />

            <FormInput
              label="Phone"
              field="phone"
              type="text"
              required={false}
              value={form.phone}
              onChange={(value) => updateFormField("phone", value)}
            />

            {/* Type of Shoot */}
            <div>
              <label className="text-sm text-[#CCCCCC] block mb-1">
                Type of Shoot
              </label>
              <div className="relative">
                <select
                  value={form.shootType}
                  onChange={(e) => updateFormField("shootType", e.target.value)}
                  className="w-full appearance-none rounded-lg p-3 bg-[#1c1c1c] text-white border border-white/10 
                             focus:border-[#FF3100] focus:ring-1 focus:ring-[#FF3100] outline-none transition"
                >
                  <option>Basic Event Coverage</option>
                  <option>Mid Tier Event Coverage</option>
                  <option>High End Event Coverage</option>
                  <option>Small Event / Short Shoot</option>
                  <option>Corporate / Promo Video</option>
                  <option>Other</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FF3100] pointer-events-none"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M6 9l6 6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label className="text-sm text-[#CCCCCC] block mb-1">
                Preferred Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => updateFormField("date", e.target.value)}
                className="w-full rounded-lg p-3 bg-[#1c1c1c] text-white border border-white/10 
                           focus:border-[#FF3100] focus:ring-1 focus:ring-[#FF3100] outline-none transition [color-scheme:dark]"
              />
            </div>

            {/* Message */}
            <div>
              <label className="text-sm text-[#CCCCCC] block mb-1">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) => updateFormField("message", e.target.value)}
                rows={4}
                className="w-full rounded-lg p-3 bg-[#1c1c1c] text-white border border-white/10 
                           focus:border-[#FF3100] focus:ring-1 focus:ring-[#FF3100] outline-none transition"
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
              <p className="text-sm text-[#CCCCCC] text-center sm:text-left">
                We typically respond within 24 hours.
              </p>

              <button
                type="submit"
                disabled={loading || sent}
                className={`relative flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl font-bold uppercase 
                           transition-all duration-200 active:scale-95
                           ${
                             sent
                               ? "bg-green-500 text-white"
                               : "bg-[#FF3100] text-black hover:bg-[#ff4f26]"
                           }
                           ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                )}

                {sent && (
                  <svg
                    className="h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}

                {loading ? "Sending..." : sent ? "Sent!" : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
