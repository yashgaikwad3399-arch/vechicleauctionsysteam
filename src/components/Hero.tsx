import { motion } from "motion/react";
import { CreateAuctionDialog } from "./CreateAuctionDialog";
import { useWeb3 } from "../hooks/useWeb3";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  const { isConnected, connect } = useWeb3();

  return (
    <div className="relative py-24 overflow-hidden bg-gradient-to-br from-[#F3E8FF] via-[#E0E7FF] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/80 text-xs font-bold text-[#2D2A70] mb-8 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#9333EA] animate-pulse" />
              100% ONLINE AUTOMOBILE B2B MARKETPLACE
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-[#2D2A70] mb-6 leading-[0.85]">
              Start Buying <br />
              with <span className="text-[#9333EA] bg-[#9333EA]/10 px-4 rounded-2xl">VELO-AUCTION</span> <br />
              Auctions
            </h1>
            
            <p className="max-w-xl text-lg text-gray-600 mb-10 leading-relaxed font-medium">
              Discover premium vehicles through India's most trusted digital auction platform. <span className="text-[#2D2A70] font-bold">Transparent, secure, and efficient.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button 
                onClick={isConnected ? undefined : connect}
                className="bg-[#FF6321] hover:bg-[#E5591D] text-white font-black px-10 py-7 text-lg rounded-2xl shadow-lg shadow-[#FF6321]/20 group"
              >
                Join Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline"
                className="bg-white/40 border-white/80 text-[#9333EA] font-black px-10 py-7 text-lg rounded-2xl hover:bg-white/60"
              >
                Learn More
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${i + 10}/40/40`} alt="user" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-3 h-3 text-yellow-400 fill-current">★</div>
                  ))}
                  <span className="text-sm font-bold text-[#2D2A70] ml-1">4.9/5</span>
                </div>
                <p className="text-xs text-gray-500 font-bold">10,000+ Happy Dealers</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#9333EA]/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#FF6321]/10 rounded-full blur-[80px]" />
            
            <div className="relative bg-white rounded-[40px] p-6 shadow-2xl border border-white/50 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#9333EA]/5 to-transparent rounded-bl-[100px]" />
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-black text-red-500 tracking-widest uppercase">Live</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <span className="text-xs font-bold">124</span>
                </div>
              </div>

              <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800" 
                  alt="BMW" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-black text-[#2D2A70]">BMW X5 xDrive40i</h3>
                    <p className="text-xs font-bold text-gray-400">15K km • Auto • Petrol</p>
                  </div>
                  <div className="bg-[#9333EA]/5 p-2 rounded-2xl flex flex-col items-center">
                    <span className="text-[10px] font-black text-[#9333EA]">42</span>
                    <span className="text-[8px] font-bold text-gray-400 uppercase">Watchers</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Bid</p>
                    <p className="text-xl font-black text-[#2D2A70]">₹4,50,000</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Market Value</p>
                    <p className="text-xl font-black text-gray-300 line-through">₹5,20,000</p>
                  </div>
                </div>

                <div className="bg-[#FFF7ED] p-4 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#FF6321]/10 flex items-center justify-center text-[#FF6321]">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
                        🕒
                      </motion.div>
                    </div>
                    <span className="text-xs font-bold text-[#FF6321]">Time Left</span>
                  </div>
                  <span className="text-lg font-black text-[#FF6321]">02:34:18</span>
                </div>

                <Button className="w-full bg-[#2D2A70] hover:bg-[#1E1C4A] text-white font-black py-6 rounded-2xl text-lg">
                  Place Bid
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
