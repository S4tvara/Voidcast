import Header from '@/components/Header';
import About from '@/components/About';
import Console from '@/components/Console';
import Architecture from '@/components/Architecture';
import Recipes from '@/components/Recipes';
import Roadmap from '@/components/Roadmap';
import Philosophy from '@/components/Philosophy';
import Footer from '@/components/Footer';
import GlitchText from '@/components/GlitchText';
import Reveal from '@/components/Reveal';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-6 pt-20">
        <div className="animate-float">
          <div className="relative">
            <div className="absolute -inset-8 bg-white/5 blur-3xl rounded-full opacity-50"></div>
            <GlitchText 
              text="VOIDCAST" 
              as="h1" 
              className="text-6xl md:text-9xl font-bold tracking-tighter text-white relative z-10 mix-blend-overlay cursor-default"
              trigger="auto"
            />
          </div>
          
          <Reveal delay={200}>
            <p className="text-xl md:text-2xl text-gray-400 font-light mt-8 max-w-2xl mx-auto leading-relaxed">
              Send it into the void. <br className="hidden md:block"/> 
              <span className="text-white">Watch what screams back.</span>
            </p>
          </Reveal>
        </div>

        <div className="absolute bottom-12 animate-bounce text-gray-500">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </div>
      </section>

      <About />
      <Console />
      <Recipes />
      <Architecture />
      <Roadmap />
      <Philosophy />
      <Footer />
    </main>
  );
}
