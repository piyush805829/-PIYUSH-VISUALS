"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Instagram,
  MessageCircle,
  ArrowUpRight,
  Copy,
  Check,
  Send,
  Sparkles,
  PhoneCall,
  Coins,
} from "lucide-react";

export function Contact() {
  // Verified contact details
  const contactConfig = {
    email: "sainipiyush5924@gmail.com",
    whatsapp: "8058296481",
    whatsappDisplay: "+91 80582 96481",
    whatsappUrl: "https://wa.me/918058296481?text=Hi%20Piyush!%20I'm%20interested%20in%20a%20video%20editing%20project.",
    instagram: "https://instagram.com/piyushvisualss",
    instagramHandle: "@piyushvisualss",
  };

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");

  const budgetOptions = {
    INR: [
      { value: "₹400 – ₹1,000", label: "₹400 – ₹1,000 ($5 – $12) — Single Reel / Short-Form Cut" },
      { value: "₹1,000 – ₹3,000", label: "₹1,000 – ₹3,000 ($12 – $36) — Talking Head & Infotainment" },
      { value: "₹3,000 – ₹7,500", label: "₹3,000 – ₹7,500 ($36 – $90) — Product Showcase & Retail" },
      { value: "₹7,500 – ₹15,000", label: "₹7,500 – ₹15,000 ($90 – $180) — Architecture Tour / Event Coverage" },
      { value: "₹15,000 – ₹30,000", label: "₹15,000 – ₹30,000 ($180 – $360) — 4K Cinematic Commercial Film" },
      { value: "₹25,000 – ₹50,000+/mo", label: "₹25,000 – ₹50,000+ / mo — Monthly Creator Retainer (15–30 Reels)" },
      { value: "Custom Scope", label: "Custom Scope / Flexible Discussion" },
    ],
    USD: [
      { value: "$5 – $15", label: "$5 – $15 (~₹400 – ₹1,200) — Single Reel / Short-Form Cut" },
      { value: "$15 – $40", label: "$15 – $40 (~₹1,200 – ₹3,300) — Talking Head & Infotainment" },
      { value: "$40 – $100", label: "$40 – $100 (~₹3,300 – ₹8,300) — Product Showcase & Retail" },
      { value: "$100 – $200", label: "$100 – $200 (~₹8,300 – ₹16,500) — Architecture Tour / Event Coverage" },
      { value: "$200 – $400", label: "$200 – $400 (~₹16,500 – ₹33,000) — 4K Cinematic Commercial Film" },
      { value: "$300 – $600+/mo", label: "$300 – $600+ / mo — Monthly Creator Retainer (15–30 Reels)" },
      { value: "Custom Scope", label: "Custom Scope / Flexible Discussion" },
    ],
  };

  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "",
    projectType: "Short-form Reels / TikToks",
    budget: "₹400 – ₹1,000",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(contactConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCurrencyChange = (newCurr: "INR" | "USD") => {
    setCurrency(newCurr);
    setFormData((prev) => ({
      ...prev,
      budget: budgetOptions[newCurr][0].value,
    }));
  };

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const subject = encodeURIComponent(`Project Inquiry: ${formData.projectType} — from ${formData.name}`);
    const body = encodeURIComponent(
      `Name / Brand: ${formData.name}\n` +
      `Contact Info: ${formData.emailOrPhone}\n` +
      `Project Category: ${formData.projectType}\n` +
      `Estimated Budget: ${formData.budget} (${currency})\n\n` +
      `Project Brief & Goals:\n${formData.message}`
    );

    window.location.href = `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Piyush! I want to discuss a video project.\n\n` +
      `Name: ${formData.name || "Client"}\n` +
      `Category: ${formData.projectType}\n` +
      `Budget: ${formData.budget}\n` +
      (formData.message ? `Details: ${formData.message}` : "")
    );
    window.open(`https://wa.me/918058296481?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative bg-[#060606] overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#D6FF48]/[0.035] blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pb-12 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D6FF48]">
              [ 05 // INITIATE ]
            </span>
            <span className="text-white/20">/</span>
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              COMMISSIONS & COLLABORATIONS
            </span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
            LET&apos;S CREATE SOMETHING
            <br />
            <span className="text-[#D6FF48]">UNFORGETTABLE.</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12">
          {/* Left Column: Direct channels */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-neutral-300 text-lg font-light leading-relaxed mb-8">
                Ready to elevate your visual content? I am currently accepting select editing
                commissions, retainer partnerships, and commercial film projects.
              </p>

              {/* Direct channels list */}
              <div className="space-y-4">
                {/* Email item */}
                <div className="p-4 bg-[#0e0e0e] border border-white/10 flex items-center justify-between group hover:border-[#D6FF48]/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-[#D6FF48] group-hover:border-[#D6FF48] transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                        Direct Email
                      </span>
                      <a
                        href={`mailto:${contactConfig.email}`}
                        className="font-mono text-xs sm:text-sm text-white hover:text-[#D6FF48] transition-colors break-all"
                      >
                        {contactConfig.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={copyEmail}
                    className="p-2 text-neutral-400 hover:text-white transition-colors flex-shrink-0"
                    title="Copy Email"
                    aria-label="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-[#D6FF48]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* WhatsApp item */}
                <a
                  href={contactConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#0e0e0e] border border-white/10 flex items-center justify-between group hover:border-[#D6FF48]/50 transition-colors block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-[#D6FF48] group-hover:border-[#D6FF48] transition-colors">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                        WhatsApp Instant Chat
                      </span>
                      <span className="font-mono text-xs sm:text-sm text-white group-hover:text-[#D6FF48] transition-colors block">
                        {contactConfig.whatsappDisplay}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#D6FF48] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>

                {/* Instagram item */}
                <a
                  href={contactConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#0e0e0e] border border-white/10 flex items-center justify-between group hover:border-[#D6FF48]/50 transition-colors block"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/[0.03] border border-white/10 flex items-center justify-center text-neutral-300 group-hover:text-[#D6FF48] group-hover:border-[#D6FF48] transition-colors">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                        Visual Socials / DM
                      </span>
                      <span className="font-mono text-xs sm:text-sm text-white group-hover:text-[#D6FF48] transition-colors block">
                        {contactConfig.instagramHandle}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#D6FF48] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              </div>
            </div>

            {/* Turnaround Guarantee */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] font-mono text-xs text-neutral-400">
              <span className="text-white block font-bold mb-1">Direct Communication SLA</span>
              <p>Inquiries received will be reviewed and answered within 12–24 business hours.</p>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 bg-[#0c0c0c] border border-white/10 relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-editorial text-2xl font-bold uppercase text-white">
                    PROJECT INQUIRY BRIEF
                  </h3>
                  <p className="text-xs font-mono text-neutral-400">
                    Fill in your project details to get a customized proposal.
                  </p>
                </div>

                {/* Currency Switcher Toggle */}
                <div className="flex items-center gap-1 p-1 bg-[#141414] border border-white/10 w-max">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 px-2 flex items-center gap-1">
                    <Coins className="w-3 h-3 text-[#D6FF48]" />
                    Currency:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCurrencyChange("INR")}
                    className={`px-2.5 py-1 text-[11px] font-mono font-bold transition-all ${
                      currency === "INR"
                        ? "bg-[#D6FF48] text-black shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    ₹ INR (Rupees)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCurrencyChange("USD")}
                    className={`px-2.5 py-1 text-[11px] font-mono font-bold transition-all ${
                      currency === "USD"
                        ? "bg-[#D6FF48] text-black shadow-sm"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    $ USD
                  </button>
                </div>
              </div>

              {submitted && (
                <div className="mb-6 p-4 bg-[#D6FF48]/10 border border-[#D6FF48] text-[#D6FF48] font-mono text-xs flex items-center gap-3">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>
                    Inquiry draft initiated! Your email client has been opened with the brief pre-formatted.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmitEmail} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Your Name / Brand *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Carter"
                      className="w-full px-4 py-3 bg-[#141414] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#D6FF48] transition-colors"
                    />
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Email or WhatsApp *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.emailOrPhone}
                      onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                      placeholder="e.g. yourname@gmail.com or 80582..."
                      className="w-full px-4 py-3 bg-[#141414] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#D6FF48] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Project Type */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                      Project Category
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 bg-[#141414] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#D6FF48] transition-colors"
                    >
                      <option value="Short-form Reels / TikToks">Short-form Reels / TikToks</option>
                      <option value="Cinematic Commercial (16:9)">Cinematic Commercial (16:9)</option>
                      <option value="Talking Head / Infotainment">Talking Head / Infotainment</option>
                      <option value="Product Showcase / Retail">Product Showcase / Retail</option>
                      <option value="Architecture / Interior Tour">Architecture / Interior Tour</option>
                      <option value="Real Estate / Event Coverage">Real Estate / Event Coverage</option>
                      <option value="Full Retainer / Multi-Video Package">Full Retainer / Multi-Video Package</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                        Budget Range ({currency})
                      </label>
                      <span className="text-[10px] font-mono text-[#D6FF48]">
                        Starts at ₹400 ($5)
                      </span>
                    </div>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 bg-[#141414] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#D6FF48] transition-colors"
                    >
                      {budgetOptions[currency].map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Brief / Details */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Project Vision & Reference *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your raw footage, timeline expectations, preferred style, references, and deadline..."
                    className="w-full px-4 py-3 bg-[#141414] border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-[#D6FF48] transition-colors resize-none"
                  />
                </div>

                {/* Submit Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#D6FF48] text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send via Email</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="w-full py-4 bg-[#181818] border border-[#25D366]/40 text-[#25D366] font-mono font-bold text-xs uppercase tracking-widest hover:bg-[#25D366] hover:text-black transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
