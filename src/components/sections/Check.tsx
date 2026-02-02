"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";

// ----------------------------------------------------------------------
// TYPES & DATA
// ----------------------------------------------------------------------
type FormState = {
  name: string;
  email: string;
  phone: string;
  shootType: string;
  date: string;
  message: string;
};

const rateCards = [
  {
    title: "Basic Event Package",
    price: "$1,500",
    desc: "5–6 hours coverage • 1 Camera • Highlight Reel",
  },
  {
    title: "Mid-Tier Event",
    price: "$3,500",
    desc: "8–10 hours • 2 Cameras • Full Doc + Highlight",
  },
  {
    title: "High-End Production",
    price: "$6,500+",
    desc: "Multi-day • Drone • Cinema Line Cameras • Crew",
  },
  {
    title: "Corporate / Promo",
    price: "$2k–$5k",
    desc: "Scripting • Lighting Setup • Full Edit",
  },
  {
    title: "Hourly Rate",
    price: "$200/hr",
    desc: "Post-production or additional shooting hours",
  },
];

// ----------------------------------------------------------------------
// HELPER: FORM INPUT
// ----------------------------------------------------------------------
const FormInput = React.memo(
  ({
    label,
    field,
    type,
    required = true,
    value,
    onChange,
    placeholder,
  }: {
    label: string;
    field: keyof FormState;
    type: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
  }) => {
    const today = new Date().toISOString().split("T")[0];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;
      if (field === "phone") {
        val = val.replace(/[^0-9]/g, "").slice(0, 11);
      }
      onChange(val);
    };

    return (
      <div className="group">
        <label className="text-[10px] uppercase tracking-widest text-[#FF3100] font-mono mb-2 block">
          {label} {required && "*"}
        </label>
        <input
          required={required}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          inputMode={field === "phone" ? "numeric" : undefined}
          min={field === "date" ? today : undefined}
          className="w-full bg-neutral-900/50 border-b border-white/20 text-white p-4 focus:border-[#FF3100] focus:bg-neutral-900 outline-none transition-all duration-300 placeholder:text-white/20"
        />
      </div>
    );
  },
);
FormInput.displayName = "FormInput";

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------
export default function Contact() {
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
    [],
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        shootType: "Basic Event Coverage",
        date: "",
        message: "",
      });
      setTimeout(() => setSent(false), 3000);
    }, 1500);

    /* // Uncomment when API is ready
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
        // reset form...
      }
    } catch (error) { ... } 
    */
  }

  return (
    <section
      id="booking"
      className="relative min-h-screen bg-black text-white py-24 px-6 md:px-12 flex items-center"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('/grain.png')] opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
        {/* ----------------------------------------------------
            LEFT COLUMN: RATES (The "Menu")
            ---------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <span className="text-[#FF3100] font-mono text-xs uppercase tracking-widest mb-6 block">
            Invest In Quality
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-12">
            Services & <br /> Rates
          </h2>

          <div className="space-y-8">
            {rateCards.map((item, i) => (
              <div key={i} className="group cursor-default">
                <div className="flex items-baseline justify-between border-b border-white/10 pb-4 mb-2 group-hover:border-[#FF3100] transition-colors duration-300">
                  <h3 className="text-xl font-medium text-gray-200 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-lg font-mono text-[#FF3100]">
                    {item.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-light">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 border border-white/10 bg-white/5 rounded-lg">
            <p className="text-sm text-gray-400 leading-relaxed">
              <span className="text-white font-bold block mb-2">Note:</span>
              Prices serve as a baseline. Every project has unique requirements.
              Fill out the form for a custom quote tailored to your specific
              vision.
            </p>
          </div>
        </motion.div>

        {/* ----------------------------------------------------
            RIGHT COLUMN: THE FORM (Minimalist)
            ---------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-neutral-900/20 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-sm"
        >
          <h3 className="text-2xl font-bold mb-8">Start a Project</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                label="Your Name"
                field="name"
                type="text"
                value={form.name}
                onChange={(val) => updateFormField("name", val)}
                placeholder="John Doe"
              />
              <FormInput
                label="Email Address"
                field="email"
                type="email"
                value={form.email}
                onChange={(val) => updateFormField("email", val)}
                placeholder="john@example.com"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormInput
                label="Phone Number"
                field="phone"
                type="tel"
                value={form.phone}
                onChange={(val) => updateFormField("phone", val)}
                placeholder="(555) 000-0000"
              />
              <FormInput
                label="Preferred Date"
                field="date"
                type="date"
                value={form.date}
                onChange={(val) => updateFormField("date", val)}
              />
            </div>

            {/* Custom Select Input */}
            <div className="group">
              <label className="text-[10px] uppercase tracking-widest text-[#FF3100] font-mono mb-2 block">
                Project Type *
              </label>
              <select
                required
                value={form.shootType}
                onChange={(e) => updateFormField("shootType", e.target.value)}
                className="w-full bg-neutral-900/50 border-b border-white/20 text-white p-4 focus:border-[#FF3100] outline-none appearance-none cursor-pointer hover:bg-neutral-900 transition-colors"
              >
                {rateCards.map((r) => (
                  <option key={r.title} value={r.title}>
                    {r.title}
                  </option>
                ))}
                <option value="Other">Other / Custom Request</option>
              </select>
            </div>

            <div className="group">
              <label className="text-[10px] uppercase tracking-widest text-[#FF3100] font-mono mb-2 block">
                Tell us about your vision *
              </label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => updateFormField("message", e.target.value)}
                placeholder="Describe your project, locations, and any specific ideas..."
                className="w-full bg-neutral-900/50 border-b border-white/20 text-white p-4 focus:border-[#FF3100] focus:bg-neutral-900 outline-none transition-all duration-300 placeholder:text-white/20 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading || sent}
              className={`w-full py-5 mt-4 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-300
                    ${sent ? "bg-green-600 text-white" : "bg-white text-black hover:bg-[#FF3100] hover:text-white"}`}
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : sent ? (
                <>
                  Message Sent <Check size={16} />
                </>
              ) : (
                <>
                  Send Request <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
