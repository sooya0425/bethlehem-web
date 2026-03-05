"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";

export default function SoulStayApplyPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    program: [] as string[],
    people: "1",
    checkinDate: "",
    duration: "1박 2일",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      if (checked) {
        return { ...prev, program: [...prev.program, value] };
      } else {
        return { ...prev, program: prev.program.filter((p) => p !== value) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "soulstay",
          ...form,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("예약 신청 전송에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-background transition-colors duration-300">
        <Navbar />
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                ✓
              </div>
              <h2 className="text-3xl font-bold mb-4">예약 신청이 완료되었습니다!</h2>
              <p className="text-muted-foreground mb-8">
                소울스테이와 함께해 주셔서 감사합니다. <br />
                담당자가 확인 후 기재하신 연락처로 예약 확정 안내를 드리겠습니다.
              </p>
              <a href="/soulstay" className="text-primary font-bold hover:underline">
                ← 소울스테이 페이지로 돌아가기
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">소울스테이 예약하기</h1>
            <p className="text-xl text-white/70 leading-relaxed">
              자연 속에서의 쉼과 회복을 위한 첫걸음입니다. <br />
              원하시는 일정과 프로그램을 선택해 주세요.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-card border border-border rounded-4xl p-8 md:p-12 shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-8 text-center text-foreground">예약 신청서</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2 text-foreground">이름 <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="홍길동"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-foreground">연락처 <span className="text-rose-500">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="010-1234-5678"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-foreground">이메일</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-3 text-foreground">
                  참여를 원하는 프로그램 (다중 선택 가능)
                </label>
                <div className="space-y-3 p-4 rounded-xl border border-border bg-background transition-all">
                  {["쉼의 시작 (휴식형)", "치유의 식탁 (음식치유)", "영성의 밤 (기도/명상)"].map((prog) => (
                    <label key={prog} className="flex items-center space-x-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 rounded border border-border bg-card group-hover:border-primary transition-colors">
                        <input
                          type="checkbox"
                          value={prog}
                          checked={form.program.includes(prog)}
                          onChange={handleCheckboxChange}
                          className="opacity-0 absolute inset-0 cursor-pointer"
                        />
                        {form.program.includes(prog) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 bg-primary rounded-sm"
                          />
                        )}
                      </div>
                      <span className="text-foreground group-hover:text-primary transition-colors select-none">{prog}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2 text-foreground">인원</label>
                  <input
                    type="number"
                    name="people"
                    value={form.people}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-foreground">체류 기간</label>
                  <select
                    name="duration"
                    value={form.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    <option value="당일">당일</option>
                    <option value="1박 2일">1박 2일</option>
                    <option value="2박 3일">2박 3일</option>
                    <option value="3박 4일 이상">3박 4일 이상</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-foreground">입소 희망일 <span className="text-rose-500">*</span></label>
                <input
                  type="date"
                  name="checkinDate"
                  value={form.checkinDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 text-foreground">요청사항</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="특별한 요청사항이나 문의사항이 있으시면 남겨주세요."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "전송 중..." : "예약 신청하기"}
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      <footer className="py-12 border-t border-border bg-muted/30">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © 2026 사회복지법인 베들레헴공동체. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
