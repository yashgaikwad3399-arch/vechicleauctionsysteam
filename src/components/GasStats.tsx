import { useWeb3 } from "../hooks/useWeb3";
import { Zap, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const GasStats = () => {
  const { gasUsed, isConnected } = useWeb3();

  if (!isConnected || !gasUsed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-5 shadow-2xl shadow-purple-200/50 flex items-center gap-4">
          <div className="bg-[#9333EA]/10 p-3 rounded-2xl">
            <Zap className="w-5 h-5 text-[#9333EA]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-black">Last Transaction Gas</span>
              <Activity className="w-3 h-3 text-green-500 animate-pulse" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#2D2A70]">{gasUsed}</span>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">units</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
