"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SubMenuNav from "@/components/SubMenuNav";
import { motion } from "framer-motion";

export default function VolunteerApplyPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    group: "",
    groupSize: "",
    preferDate: "",
    preferTime: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

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
          type: "volunteer",
          ...form,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("신청서 전송에 실패했습니다. 다시 시도해 주세요.");
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
        <SubMenuNav />
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
              <h2 className="text-3xl font-bold mb-4">신청이 완료되었습니다!</h2>
              <p className="text-muted-foreground mb-8">
                자원봉사에 관심을 가져주셔서 감사합니다. <br />
                담당자가 확인 후 기재하신 연락처로 안내드리겠습니다.
              </p>
              <a href="/volunteer" className="text-primary font-bold hover:underline">
                ← 봉사안내 페이지로 돌아가기
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
      <SubMenuNav />
      
      <section className="pt-32 pb-20 bg-muted/50 transition-colors">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">자원봉사 신청서 작성</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              아래 양식을 작성해주시면 담당자가 확인 후 연락드리겠습니다.
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
            <h2 className="text-2xl font-bold mb-8 text-center">자원봉사 신청서</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">이름 <span className="text-rose-500">*</span></label>
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
                <label className="block text-sm font-bold mb-2">연락처 <span className="text-rose-500">*</span></label>
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
                <label className="block text-sm font-bold mb-2">이메일</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">소속 단체명</label>
                  <input
                    type="text"
                    name="group"
                    value={form.group}
                    onChange={handleChange}
                    placeholder="개인 봉사 시 비워두세요"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">봉사 인원</label>
                  <input
                    type="number"
                    name="groupSize"
                    value={form.groupSize}
                    onChange={handleChange}
                    placeholder="예: 5"
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">희망 날짜 <span className="text-rose-500">*</span></label>
                  <input
                    type="date"
                    name="preferDate"
                    value={form.preferDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">희망 시간</label>
                  <select
                    name="preferTime"
                    value={form.preferTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    <option value="">선택해주세요</option>
                    <option value="오전 (09:00~12:00)">오전 (09:00~12:00)</option>
                    <option value="오후 (13:00~17:00)">오후 (13:00~17:00)</option>
                    <option value="종일 (09:00~17:00)">종일 (09:00~17:00)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">전하고 싶은 말씀</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="봉사 관련 문의사항이나 하고 싶은 말씀을 남겨주세요."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 dark:bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 dark:hover:bg-primary/90 transition-all shadow-xl shadow-slate-200 dark:shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "전송 중..." : "봉사 신청하기"}
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
