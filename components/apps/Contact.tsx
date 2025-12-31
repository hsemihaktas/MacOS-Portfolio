"use client";

import React, { useState } from "react";
import { Send, Inbox, Archive, Trash2, User, Paperclip } from "lucide-react";
import { Language } from "@/lib/types";
import { DATA } from "@/lib/data";

interface ContactProps {
  lang: Language;
  isDarkMode?: boolean;
}

const Contact: React.FC<ContactProps> = ({ lang, isDarkMode }) => {
  const d = DATA[lang].contact;
  const personal = DATA[lang].about;
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    senderEmail: "",
  });

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const bgPrimary = isDarkMode ? "bg-[#121212]" : "bg-white";
  const bgSidebar = isDarkMode ? "bg-[#1E1E1E]" : "bg-[#F9F9F9]";
  const textColor = isDarkMode ? "text-white" : "text-black";
  const borderStyle = isDarkMode ? "border-white/5" : "border-black/[0.04]";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    // Validate email before submitting
    if (!validateEmail(formData.senderEmail)) {
      setEmailError(
        lang === "tr"
          ? "Geçerli bir e-posta adresi giriniz"
          : "Please enter a valid email address"
      );
      return;
    }
    setEmailError("");

    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setSent(true);
      setTimeout(() => {
        setSent(false);
        setFormData({ subject: "", message: "", senderEmail: "" });
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to send email");
      setTimeout(() => setError(""), 5000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className={`flex h-full ${bgPrimary} font-sans overflow-hidden select-text transition-colors duration-500`}
    >
      <div
        className={`w-[180px] ${bgSidebar} border-r ${borderStyle} flex flex-col pt-4 shrink-0 hidden sm:flex`}
      >
        <h4
          className={`px-4 text-[11px] font-bold ${
            isDarkMode ? "text-white/40" : "text-[#8E8E93]"
          } uppercase tracking-tight mb-4`}
        >
          {lang === "tr" ? "Favoriler" : "Favorites"}
        </h4>
        <ul className="px-2 space-y-0.5">
          <li
            className={`flex items-center gap-2.5 px-3 py-1.5 ${
              isDarkMode
                ? "bg-blue-600 text-white"
                : "bg-[#E7F1FB] text-[#007AFF]"
            } rounded-md cursor-default`}
          >
            <Inbox size={15} />{" "}
            <span className="text-[13px] font-medium">{d.inbox}</span>
          </li>
          {[d.sent, d.drafts, d.trash].map((item, idx) => (
            <li
              key={item}
              className={`flex items-center gap-2.5 px-3 py-1.5 hover:bg-black/5 ${
                isDarkMode ? "text-white/60" : "text-[#424242]"
              } rounded-md cursor-default transition-colors`}
            >
              <Send size={15} className="opacity-50" />{" "}
              <span className="text-[13px] font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`flex-1 flex flex-col relative ${bgPrimary} overflow-hidden`}
      >
        {sent ? (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 text-center bg-transparent backdrop-blur-xl">
            <div className="w-16 h-16 bg-[#007AFF] rounded-full flex items-center justify-center mb-6 shadow-xl">
              <Send size={28} className="text-white -mr-1" />
            </div>
            <h3 className={`text-xl font-bold ${textColor}`}>{d.sentTitle}</h3>
            <p
              className={`text-[13px] ${
                isDarkMode ? "text-white/40" : "text-[#86868b]"
              } font-medium`}
            >
              {d.sentDesc}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div
              className={`h-12 border-b ${borderStyle} flex items-center justify-between px-6 ${
                isDarkMode ? "bg-white/5" : "bg-[#fcfcfc]/80"
              } backdrop-blur-md`}
            >
              <div className="flex items-center gap-6 text-[#8E8E93]">
                <Trash2
                  size={16}
                  className="hover:text-red-500 cursor-pointer"
                />
                <Paperclip
                  size={16}
                  className="hover:text-black/60 cursor-pointer"
                />
              </div>
              <button
                type="submit"
                disabled={
                  !formData.message.trim() ||
                  !formData.subject.trim() ||
                  !formData.senderEmail.trim() ||
                  sending
                }
                className="bg-[#007AFF] hover:bg-[#0062cc] disabled:opacity-30 disabled:cursor-not-allowed text-white px-5 py-1.5 rounded-lg text-[13px] font-semibold transition-all shadow-sm"
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {lang === "tr" ? "Gönderiliyor..." : "Sending..."}
                  </span>
                ) : (
                  <>
                    <Send size={14} className="inline mr-2" /> {d.send}
                  </>
                )}
              </button>
            </div>
            <div className={isDarkMode ? "bg-white/[0.02]" : "bg-[#FCFCFC]"}>
              <div
                className={`px-6 py-3 flex items-center gap-4 border-b ${borderStyle}`}
              >
                <span
                  className={`text-[13px] ${
                    isDarkMode ? "text-white/40" : "text-[#8E8E93]"
                  } w-16 text-right font-medium`}
                >
                  {d.to}:
                </span>
                <div
                  className={`flex items-center gap-1.5 ${
                    isDarkMode
                      ? "bg-white/10 text-white"
                      : "bg-white text-black"
                  } border ${borderStyle} px-2.5 py-0.5 rounded-md text-[13px] font-medium shadow-sm transition-all hover:bg-opacity-80`}
                >
                  <div className="w-4 h-4 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <User size={10} className="text-blue-500" />
                  </div>
                  {personal.email}
                </div>
              </div>
              <div
                className={`px-6 py-3 flex flex-col gap-1 border-b ${borderStyle} group focus-within:bg-blue-500/[0.03] transition-colors`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-[13px] ${
                      emailError
                        ? "text-red-500"
                        : isDarkMode
                        ? "text-white/40"
                        : "text-[#8E8E93]"
                    } w-16 text-right font-medium group-focus-within:text-blue-500 transition-colors`}
                  >
                    {d.from}:
                  </span>
                  <input
                    type="email"
                    value={formData.senderEmail}
                    onChange={(e) => {
                      setFormData({ ...formData, senderEmail: e.target.value });
                      if (emailError) setEmailError("");
                    }}
                    placeholder={
                      lang === "tr" ? "user@example.com" : "user@example.com"
                    }
                    className={`text-[13px] ${textColor} flex-1 outline-none bg-transparent placeholder:opacity-30 font-medium ${
                      emailError ? "text-red-500" : ""
                    }`}
                    required
                  />
                </div>
                {emailError && (
                  <span className="text-[11px] text-red-500 font-medium ml-20">
                    {emailError}
                  </span>
                )}
              </div>
              <div
                className={`px-6 py-3 flex items-center gap-4 border-b ${borderStyle} group focus-within:bg-blue-500/[0.03] transition-colors`}
              >
                <span
                  className={`text-[13px] ${
                    isDarkMode ? "text-white/40" : "text-[#8E8E93]"
                  } w-16 text-right font-medium group-focus-within:text-blue-500 transition-colors`}
                >
                  {d.subject}:
                </span>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder={lang === "tr" ? "Konu başlığı..." : "Subject..."}
                  className={`text-[13px] font-semibold ${textColor} flex-1 outline-none bg-transparent placeholder:opacity-30`}
                  required
                />
              </div>
            </div>
            <div className="flex-1 relative">
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className={`w-full h-full p-8 text-[15px] leading-relaxed ${textColor} outline-none resize-none bg-transparent placeholder:opacity-30`}
                placeholder={d.placeholder}
              ></textarea>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
