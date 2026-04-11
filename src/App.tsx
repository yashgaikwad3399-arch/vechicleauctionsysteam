/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Web3Provider } from "./hooks/useWeb3";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AuctionDashboard } from "./components/AuctionDashboard";
import { GasStats } from "./components/GasStats";
import { Toaster } from "./components/ui/sonner";
import { motion, AnimatePresence } from "motion/react";
import { Search, Building2, Trophy, Users, Phone, Mail, Send } from "lucide-react";
import { Button } from "./components/ui/button";
import { Membership, AboutUs, Blogs, Careers } from "./components/PageContent";

const TrustedSection = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="inline-block px-3 py-1 rounded-full bg-[#9333EA]/5 text-[10px] font-black text-[#9333EA] uppercase tracking-widest mb-4">
        Our Partners
      </div>
      <h2 className="text-4xl md:text-5xl font-black text-[#2D2A70] mb-4">
        Trusted by <span className="text-[#9333EA]">Industry Leaders</span>
      </h2>
      <p className="text-gray-500 font-medium mb-16 max-w-2xl mx-auto">
        We partner with India's most trusted banks and financial institutions to deliver seamless vehicle auction experiences.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Tata_Motors_Logo.svg/2560px-Tata_Motors_Logo.svg.png",
          "https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Equitas_Small_Finance_Bank_logo.png/1200px-Equitas_Small_Finance_Bank_logo.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Kotak_Mahindra_Bank_logo.svg/2560px-Kotak_Mahindra_Bank_logo.svg.png",
          "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/IndusInd_Bank_logo.svg/1200px-IndusInd_Bank_logo.svg.png",
        ].map((logo, i) => (
          <div key={i} className="bg-white border border-gray-100 p-8 rounded-3xl flex items-center justify-center hover:shadow-xl hover:shadow-gray-100 transition-all">
            <img src={logo} alt="Partner" className="h-8 object-contain grayscale hover:grayscale-0 transition-all" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Building2, label: "50+", sub: "Trusted Partners" },
          { icon: Trophy, label: "10K+", sub: "Successful Auctions" },
          { icon: Users, label: "₹500Cr+", sub: "Transaction Value" },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-gray-100 p-10 rounded-[40px] shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-[#9333EA]/5 rounded-2xl flex items-center justify-center text-[#9333EA] mx-auto mb-6">
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-4xl font-black text-[#2D2A70] mb-2">{stat.label}</p>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.sub}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactSection = () => (
  <section className="py-24 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block px-3 py-1 rounded-full bg-[#9333EA]/5 text-[10px] font-black text-[#9333EA] uppercase tracking-widest mb-4">
            Ready to Connect
          </div>
          <h2 className="text-5xl font-black text-[#2D2A70] mb-6">Get in <span className="text-[#9333EA]">Touch</span></h2>
          <p className="text-gray-500 font-medium mb-10 max-w-md">
            Connect with our expert team to discover how VELO-AUCTION can transform your vehicle trading experience with personalized solutions.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-[#2D2A70] rounded-2xl flex items-center justify-center text-white">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Call us directly</p>
                <p className="text-xl font-black text-[#2D2A70]">+91 812 924 3730</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-[#9333EA] rounded-2xl flex items-center justify-center text-white">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Send Message</p>
                <p className="text-xl font-black text-[#2D2A70]">support@velo-auction.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#9333EA]/5 rounded-full blur-[80px]" />
          <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-white relative overflow-hidden">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs font-bold text-gray-400">Average response time: 15 minutes</span>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-[#9333EA]/20" />
                <input type="text" placeholder="Last Name" className="bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-[#9333EA]/20" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-[#9333EA]/20" />
              <textarea placeholder="Your Message" rows={4} className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-[#9333EA]/20" />
              <Button className="w-full bg-[#9333EA] hover:bg-[#7E22CE] text-white font-black py-6 rounded-2xl text-lg group">
                Send Message
                <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function App() {
  const [currentView, setCurrentView] = useState("home");

  const renderContent = () => {
    switch (currentView) {
      case "membership":
        return <Membership />;
      case "about":
        return <AboutUs />;
      case "contact":
        return <ContactSection />;
      case "blogs":
        return <Blogs />;
      case "careers":
        return <Careers />;
      default:
        return (
          <>
            <Hero />
            <section className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-12">upcoming auctions</h2>
                  
                  <div className="relative max-w-2xl mx-auto mb-16">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Search online events.." 
                      className="w-full bg-gray-50 border border-gray-100 rounded-3xl pl-16 pr-6 py-6 text-lg font-bold text-[#2D2A70] focus:outline-none focus:ring-4 focus:ring-[#9333EA]/5 transition-all"
                    />
                  </div>
                </div>

                <AuctionDashboard />
              </div>
            </section>
            <TrustedSection />
            <ContactSection />
          </>
        );
    }
  };

  return (
    <Web3Provider>
      <div className="min-h-screen bg-white text-[#2D2A70] selection:bg-[#9333EA]/10 selection:text-[#9333EA]">
        <Navbar currentView={currentView} onViewChange={setCurrentView} />
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
          
          <GasStats />
        </main>

        <footer className="bg-white border-t border-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <button 
                onClick={() => setCurrentView("home")}
                className="flex items-center gap-1 hover:opacity-80 transition-opacity"
              >
                <span className="text-2xl font-black tracking-tighter text-[#2D2A70]">VELO</span>
                <div className="bg-[#FF6321] p-1 rounded-sm">
                  <span className="text-white font-bold text-sm">AUCTION</span>
                </div>
              </button>
              <div className="flex flex-wrap justify-center gap-8">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
                  <a key={item} href="#" className="text-sm font-bold text-gray-400 hover:text-[#9333EA] transition-colors">{item}</a>
                ))}
              </div>
              <p className="text-sm font-bold text-gray-300">
                © 2026 VELO-AUCTION. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
        <Toaster theme="light" position="top-center" closeButton />
      </div>
    </Web3Provider>
  );
}

