import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <BentoGrid />
      
      {/* Footer 예정 섹션 */}
      <footer className="py-12 border-t border-border bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 사회복지법인 베들레헴공동체. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
