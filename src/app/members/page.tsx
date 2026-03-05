"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Heart, Star, ShieldCheck, User, Smile, Coffee, Sun, Moon, Sparkles, X } from "lucide-react";

// 직원 데이터 (15명)
const staffMembers = [
  { name: "홍길동", role: "원장", desc: "공동체의 든든한 버팀목이자 모든 식구들의 아버지 같은 존재입니다. 20년 넘게 포항에서 장애인 복지를 위해 헌신해왔습니다.", icon: <Star size={20} />, image: "/images/profiles/staff_01.png" },
  { name: "김철수", role: "사무국장", desc: "베들레헴의 살림을 책임지는 꼼꼼한 사무국장입니다. 투명하고 정직한 운영을 최우선으로 생각합니다.", icon: <ShieldCheck size={20} />, image: "/images/profiles/staff_02.png" },
  { name: "이영희", role: "생활복지팀장", desc: "식구들의 일상을 세심하게 살피는 따뜻한 리더입니다. 항상 웃음으로 식구들을 맞이합니다.", icon: <Heart size={20} />, image: "/images/profiles/staff_03.png" },
  { name: "박지민", role: "사회복지사", desc: "활기찬 에너지로 공동체에 생기를 불어넣는 사회복지사입니다. 다양한 프로그램 기획을 담당합니다.", icon: <Smile size={20} />, image: "/images/profiles/staff_04.png" },
  { name: "최규리", role: "간호사", desc: "식구들의 건강을 24시간 책임지는 수호천사입니다. 전문적인 의료 케어와 정성을 다합니다.", icon: <ShieldCheck size={20} />, image: "/images/profiles/staff_05.png" },
  { name: "정다은", role: "언어치료사", desc: "마음의 소리를 듣고 말의 문을 열어주는 치료사입니다. 식구들과의 깊은 유대감을 중시합니다.", icon: <Sparkles size={20} />, image: "/images/profiles/staff_06.png" },
  { name: "강현무", role: "영양사", desc: "균형 잡힌 식단으로 식구들의 건강한 식탁을 책임집니다. 맛과 영양 두 마리 토끼를 모두 잡습니다.", icon: <Coffee size={20} />, image: "/images/profiles/staff_07.png" },
  { name: "조아라", role: "생활지도원", desc: "식구들의 가장 가까운 곳에서 친구이자 가족이 되어줍니다. 소소한 일상을 함께 나누는 다정한 분입니다.", icon: <User size={20} />, image: "/images/profiles/staff_08.png" },
  { name: "임재범", role: "관리사", desc: "베들레헴의 모든 시설을 안전하게 관리합니다. 보이지 않는 곳에서 묵묵히 헌신하는 맥가이버입니다.", icon: <ShieldCheck size={20} />, image: "/images/profiles/staff_09.png" },
  { name: "윤하늘", role: "활동지원사", desc: "식구들의 외출과 여가 활동을 든든하게 지원합니다. 넓은 세상과 식구들을 잇는 가교 역할을 합니다.", icon: <Sun size={20} />, image: "/images/profiles/staff_10.png" },
  { name: "송민호", role: "직업훈련교사", desc: "식구들의 자립을 위한 기술 교육을 담당합니다. 할 수 있다는 자신감을 심어주는 열정적인 교사입니다.", icon: <Star size={20} />, image: "/images/profiles/staff_11.png" },
  { name: "서유리", role: "청소년상담사", desc: "젊은 식구들의 고민을 들어주고 희망찬 미래를 함께 그립니다. 내면의 성장을 돕는 상담 전문가입니다.", icon: <Smile size={20} />, image: "/images/profiles/staff_12.png" },
  { name: "한지원", role: "운전원", desc: "식구들의 안전한 이동을 책임지는 베테랑 드라이버입니다. 언제나 친절하고 안전한 운행을 약속합니다.", icon: <ShieldCheck size={20} />, image: "/images/profiles/staff_13.png" },
  { name: "오세린", role: "조리원", desc: "엄마의 손맛으로 정성 가득한 음식을 만듭니다. 식구들이 가장 기다리는 시간을 선물합니다.", icon: <Coffee size={20} />, image: "/images/profiles/staff_14.png" },
  { name: "배진우", role: "경비원", desc: "모두가 잠든 밤에도 베들레험을 안전하게 지킵니다. 평온한 휴식을 보장하는 파수꾼입니다.", icon: <Moon size={20} />, image: "/images/profiles/staff_15.png" },
];

// 식구 데이터 (15명)
const familyMembers = [
  { name: "행복이", desc: "세상에서 가장 밝은 미소를 가진 식구입니다. 꽃을 보면 아이처럼 좋아하며 주변을 환하게 만듭니다.", color: "bg-rose-100 dark:bg-rose-950/30", image: "/images/profiles/family_01.png" },
  { name: "희망이", desc: "노래 부르는 것을 정말 좋아해요. 합창단 활동을 통해 전국을 누비며 희망을 전하고 싶은 꿈이 있습니다.", color: "bg-blue-100 dark:bg-blue-950/30", image: "/images/profiles/family_02.png" },
  { name: "사랑이", desc: "그림 그리기에 천재적인 재능이 있어요. 알록달록한 색깔로 베들레헴의 풍경을 그리는 화가 지망생입니다.", color: "bg-amber-100 dark:bg-amber-950/30", image: "/images/profiles/family_03.png" },
  { name: "믿음이", desc: "진중하고 예의 바른 식구입니다. 어려운 친구들을 먼저 돕는 따뜻한 마음씨를 가졌습니다.", color: "bg-emerald-100 dark:bg-emerald-950/30", image: "/images/profiles/family_04.png" },
  { name: "기쁨이", desc: "어디서나 춤을 추는 분위기 메이커! 음악만 나오면 신나게 몸을 흔들며 모두에게 기쁨을 줍니다.", color: "bg-purple-100 dark:bg-purple-950/30", image: "/images/profiles/family_05.png" },
  { name: "소망이", desc: "산책하며 하늘 보는 것을 좋아합니다. 맑은 영혼으로 세상의 아름다움을 발견하는 관찰자입니다.", color: "bg-sky-100 dark:bg-sky-950/30", image: "/images/profiles/family_06.png" },
  { name: "평화", desc: "차분하고 사색하는 것을 즐기는 조용한 친구입니다. 퍼즐 맞추기와 블록 놀이의 달인이기도 합니다.", color: "bg-indigo-100 dark:bg-indigo-950/30", image: "/images/profiles/family_07.png" },
  { name: "은혜", desc: "항상 고맙다는 인사를 잊지 않는 친절한 식구입니다. 배려심이 깊어 공동체의 사랑을 한 몸에 받습니다.", color: "bg-pink-100 dark:bg-pink-950/30", image: "/images/profiles/family_08.png" },
  { name: "햇살", desc: "이름처럼 따사로운 기운을 뿜어냅니다. 처음 보는 사람에게도 먼저 다가가 손을 내미는 사교가입니다.", color: "bg-yellow-100 dark:bg-yellow-950/30", image: "/images/profiles/family_09.png" },
  { name: "나무", desc: "식구들 중 가장 듬직한 맏언니 역할을 합니다. 동생들을 챙기고 보듬는 모습이 영락없는 나무 같습니다.", color: "bg-green-100 dark:bg-green-950/30", image: "/images/profiles/family_10.png" },
  { name: "바다", desc: "시원시원하고 활달한 성격의 소유자입니다. 운동을 좋아해서 매일 아침 체조 시간을 주도합니다.", color: "bg-cyan-100 dark:bg-cyan-950/30", image: "/images/profiles/family_11.png" },
  { name: "구름", desc: "몽글몽글 순수한 동심을 간직하고 있습니다. 인형 놀이와 동화책 읽기를 가장 좋아하는 순둥이입니다.", color: "bg-slate-100 dark:bg-slate-900/40", image: "/images/profiles/family_12.png" },
  { name: "별이", desc: "밤하늘의 별처럼 반짝이는 호기심을 가졌습니다. 새로운 것을 배우는 데 열심인 노력파 식구입니다.", color: "bg-violet-100 dark:bg-violet-950/30", image: "/images/profiles/family_13.png" },
  { name: "송이", desc: "작고 여리지만 강인한 생명력을 가졌습니다. 식물을 가꾸는 정원사 같은 마음으로 하루를 보냅니다.", color: "bg-fuchsia-100 dark:bg-fuchsia-950/30", image: "/images/profiles/family_14.png" },
  { name: "진주", desc: "묵묵히 자기 자리를 지키는 보석 같은 존재입니다. 누구보다 성실하게 공동체 생활에 참여하는 모범생입니다.", color: "bg-teal-100 dark:bg-teal-950/30", image: "/images/profiles/family_15.png" },
];

const ProfileCard = ({ member, onOpen }: { member: any; onOpen: (m: any) => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    onClick={() => onOpen(member)}
    className="group relative flex flex-col items-center cursor-pointer"
  >
    <div className={`relative w-full aspect-3/4 rounded-[2.5rem] overflow-hidden ${member.color || "bg-secondary/30"} border border-border/50 group-hover:shadow-2xl group-hover:shadow-primary/15 transition-all duration-500`}>
      {member.image ? (
        <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      ) : null}
      <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center ${member.image ? 'bg-black/30 text-white opacity-0 group-hover:opacity-100' : ''} transition-all duration-500`}>
        {!member.image && (
          <div className="w-16 h-16 rounded-2xl bg-white/30 dark:bg-black/20 backdrop-blur-md flex items-center justify-center mb-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
            {member.icon || <User size={32} className="text-primary/60" />}
          </div>
        )}
        <div className={`space-y-1 ${member.image ? 'translate-y-4 group-hover:translate-y-0 shadow-sm backdrop-blur-md bg-black/40 p-4 rounded-xl' : ''} transition-all duration-500`}>
          <h4 className="text-xl font-bold">{member.name}</h4>
          {member.role && <p className={`text-xs font-semibold ${member.image ? 'text-white/80' : 'text-primary/80'} uppercase tracking-widest`}>{member.role}</p>}
        </div>
      </div>
      
      <div className="absolute inset-x-0 bottom-0 p-6 bg-linear-to-t from-black/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 backdrop-blur-[2px]">
        <p className="text-xs text-center font-medium text-foreground/90 leading-tight">상세 프로필 보기</p>
      </div>
    </div>
  </motion.div>
);

export default function MembersPage() {
  const [selectedMember, setSelectedMember] = useState<any>(null);

  // 모달 오픈 시 스크롤 방지
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedMember]);

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 transition-colors duration-500">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-40 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 text-center">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
          >
            베들레헴 <span className="text-primary">가족들</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            선생님 15명과 우리 식구 15명, 총 30명의 소중한 인연이<br className="hidden md:block" />
            서로의 어깨를 보듬으며 사랑의 공동체를 만들어가고 있습니다.
          </motion.p>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-24 relative bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="text-left">
              <span className="text-primary font-bold text-sm tracking-widest uppercase">Our Supporters</span>
              <h2 className="text-4xl font-bold mt-2 italic">사랑의 보호자, 직원팀</h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm">
              식구들의 안전과 행복을 위해 24시간 곁을 지키는 15명의 헌신적인 선생님들입니다.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {staffMembers.map((staff, i) => (
              <ProfileCard key={i} member={staff} onOpen={setSelectedMember} />
            ))}
          </div>
        </div>
      </section>

      {/* Family Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 text-right md:text-left">
            <div className="md:order-2">
              <span className="text-primary font-bold text-sm tracking-widest uppercase">Our Soul Friends</span>
              <h2 className="text-4xl font-bold mt-2 italic">공동체의 주인공, 우리 식구</h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm md:order-1">
              맑고 순수한 영혼을 가진 15명의 식구들이 베들레험의 매일을 빛내주고 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
            {familyMembers.map((member, i) => (
              <ProfileCard key={i} member={member} onOpen={setSelectedMember} />
            ))}
          </div>
        </div>
      </section>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-background rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row shadow-primary/20"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 backdrop-blur-md transition-colors text-foreground"
              >
                <X size={24} />
              </button>

              {/* Photo Area (3:4 Ratio) */}
              <div className={`w-full md:w-[40%] aspect-3/4 ${selectedMember.color || "bg-secondary/50"} flex items-center justify-center relative overflow-hidden`}>
                {selectedMember.image ? (
                  <img src={selectedMember.image} alt={selectedMember.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full m-12 rounded-2xl bg-white/30 dark:bg-black/20 flex items-center justify-center">
                    {selectedMember.icon || <User size={80} className="text-primary/40" />}
                  </div>
                )}
              </div>

              {/* Text Area */}
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Detailed Profile</span>
                <div className="flex items-baseline gap-3 mb-6">
                  <h3 className="text-4xl font-extrabold">{selectedMember.name}</h3>
                  {selectedMember.role && <span className="text-lg text-muted-foreground font-medium">| {selectedMember.role}</span>}
                </div>
                <div className="w-12 h-1 bg-primary rounded-full mb-8" />
                <p className="text-lg text-muted-foreground leading-relaxed italic">
                  "{selectedMember.desc}"
                </p>
                
                <div className="mt-12 flex items-center gap-4 p-4 rounded-2xl bg-secondary/30 border border-border/50">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Smile size={20} />
                  </div>
                  <span className="text-sm font-medium">언제나 마음을 다해 함께하겠습니다.</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-20 border-t border-border/50">
        <div className="container mx-auto px-6 text-center">
          <div className="bg-primary/5 rounded-[3rem] p-12 max-w-4xl mx-auto">
            <Heart className="w-12 h-12 text-primary mx-auto mb-6 animate-pulse" />
            <h3 className="text-2xl font-bold mb-4">"우리는 이미 가족입니다"</h3>
            <p className="text-muted-foreground">
              베들레헴공동체는 한 명 한 명의 소중한 생명을 존중하며,<br />
              지역사회 안에서 당당한 일원으로 살아갈 수 있도록 끝까지 함께하겠습니다.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
