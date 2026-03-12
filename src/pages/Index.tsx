import TrackingInput from "@/components/TrackingInput";
import { Package, MapPin, Shield, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/40">
        <div className="container flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Package className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">PathayDisi</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col">
        <section className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
          <div className="w-full max-w-2xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
              <Zap className="h-3 w-3" />
              Real-time Tracking • সারাদেশে ডেলিভারি
            </div>
            <h1 className="text-display text-foreground">
              Track Your Delivery
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              Enter your order ID or phone number to get instant updates on your parcel.
            </p>
            <TrackingInput className="pt-2" />
          </div>
        </section>

        {/* Trust bar */}
        <section className="border-t border-border/40 bg-card/50 py-10 px-4">
          <div className="container grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: MapPin, title: "Nationwide Coverage", desc: "সারাদেশে ৬৪ জেলায় ডেলিভারি" },
              { icon: Zap, title: "Real-time Updates", desc: "লাইভ ট্র্যাকিং ও নোটিফিকেশন" },
              { icon: Shield, title: "Safe & Secure", desc: "নিরাপদ পার্সেল হ্যান্ডলিং" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 text-center sm:text-left sm:flex-row flex-col items-center sm:items-start">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-6 px-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© 2026 PathayDisi. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
