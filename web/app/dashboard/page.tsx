import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SinkControl from '@/components/dashboard/SinkControl';

export default function Dashboard() {
  return (
    <main className="min-h-screen flex flex-col bg-black">
      <Header />
      
      <section className="flex-1 py-32 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="mb-12 border-b border-white/10 pb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
                    MISSION CONTROL
                </h1>
                <p className="text-gray-400 max-w-2xl">
                    Manage your active Voidcast instances. Monitor traffic sources and configure sinkholes in real-time.
                </p>
            </div>

            <SinkControl />
        </div>
      </section>

      <Footer />
    </main>
  );
}

