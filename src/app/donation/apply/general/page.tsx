"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SubMenuNav from "@/components/SubMenuNav";
import { motion } from "framer-motion";
import { Suspense } from "react";

function GeneralDonationForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    donationType: "일반후원",
    amount: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
          type: "donation",
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
          소중한 마음에 감사드립니다. <br />
          담당자가 확인 후 기재하신 연락처로 안내드리겠습니다.
        </p>
        <a href="/donation" className="text-primary font-bold hover:underline">
          ← 후원안내 페이지로 돌아가기
        </a>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-card border border-border rounded-4xl p-8 md:p-12 shadow-sm"
    >
      <h2 className="text-2xl font-bold mb-8 text-center">일반후원 신청서</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">
            이름 <span className="text-rose-500">*</span>
          </label>
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
          <label className="block text-sm font-bold mb-2">
            연락처 <span className="text-rose-500">*</span>
          </label>
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

        <div>
          <label className="block text-sm font-bold mb-2">후원 금액</label>
          <input
            type="text"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="예: 50,000원"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">
            전하고 싶은 말씀
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="베들레헴 가족들에게 전하고 싶은 따뜻한 한 마디를 남겨주세요."
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "전송 중..." : "일반후원 신청하기"}
        </button>
      </div>
    </motion.form>
  );
}

export default function GeneralDonationPage() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <SubMenuNav />

      <section className="pt-32 pb-20 bg-primary/5">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              일반후원 신청
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              일시적으로 자유로운 금액을 후원하실 수 있습니다. <br /> 한 번의
              따뜻한 나눔이 베들레헴 가족에게 큰 힘이 됩니다.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <Suspense
            fallback={<div className="text-center py-20">로딩 중...</div>}
          >
            <GeneralDonationForm />
          </Suspense>
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
