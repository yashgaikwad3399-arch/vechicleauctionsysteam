import * as React from "react";
import { Auction } from "../types";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useWeb3 } from "../hooks/useWeb3";
import { Clock, Tag, User, Gavel, Eye, Heart, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

interface AuctionCardProps {
  auction: Auction;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ auction }) => {
  const { placeBid, account, isConnected } = useWeb3();
  const [timeLeft, setTimeLeft] = useState("");
  const [bidAmount, setBidAmount] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = auction.endTime - now;
      
      if (diff <= 0) {
        setTimeLeft("Ended");
        clearInterval(timer);
      } else {
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [auction.endTime]);

  const handleBid = (amount?: string) => {
    const finalAmount = amount || bidAmount;
    if (!finalAmount || isNaN(Number(finalAmount))) return;
    placeBid(auction.id, finalAmount);
    setBidAmount("");
  };

  const isEnded = auction.endTime < Date.now();
  const currentBid = auction.highestBid === "0" ? auction.minBid : auction.highestBid;
  const marketValue = (parseFloat(currentBid) * 1.2).toFixed(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-white border-gray-100 shadow-xl shadow-gray-200/50 rounded-[32px] group transition-all duration-300 hover:shadow-2xl hover:shadow-purple-200/30">
        <div className="relative aspect-[4/3] overflow-hidden p-4">
          <div className="relative h-full w-full rounded-2xl overflow-hidden">
            <img 
              src={auction.imageUrl} 
              alt={`${auction.make} ${auction.model}`}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-red-500 px-2 py-1 rounded-lg shadow-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Live</span>
            </div>
            <div className="absolute top-3 right-3 flex gap-2">
              <button className="p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg text-white">
              <Eye className="w-3 h-3" />
              <span className="text-[10px] font-bold">124</span>
            </div>
          </div>
        </div>

        <CardHeader className="px-6 py-2">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-xl font-black text-[#2D2A70] leading-tight">{auction.make} {auction.model}</h3>
              <p className="text-xs font-bold text-gray-400 mt-1">15K km • Auto • Petrol</p>
            </div>
            <div className="flex gap-2">
              <div className="bg-gray-50 p-1.5 rounded-xl flex flex-col items-center min-w-[40px] border border-gray-100">
                <span className="text-[10px] font-black text-[#9333EA]">42</span>
                <span className="text-[7px] font-bold text-gray-400 uppercase">Watchers</span>
              </div>
              <div className="bg-gray-50 p-1.5 rounded-xl flex flex-col items-center min-w-[40px] border border-gray-100">
                <span className="text-[10px] font-black text-[#9333EA]">8</span>
                <span className="text-[7px] font-bold text-gray-400 uppercase">Bidders</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-50">
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Current Bid</p>
              <p className="text-lg font-black text-[#9333EA]">{currentBid} ETH</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Market Value</p>
              <p className="text-lg font-black text-gray-200 line-through">{marketValue} ETH</p>
            </div>
          </div>

          <div className="bg-[#FFF7ED] p-3 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#FF6321]/10 flex items-center justify-center text-[#FF6321]">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-[#FF6321] uppercase tracking-wider">Time Left</span>
            </div>
            <span className="text-lg font-black text-[#FF6321] font-mono">{timeLeft}</span>
          </div>

          {!isEnded && isConnected && (
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">Ξ</div>
                <input
                  type="number"
                  placeholder="Enter bid amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-8 pr-4 py-3 text-sm font-bold text-[#2D2A70] focus:outline-none focus:ring-2 focus:ring-[#9333EA]/20 transition-all"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {["0.01", "0.05", "0.10"].map((inc) => (
                  <button
                    key={inc}
                    onClick={() => handleBid((parseFloat(currentBid) + parseFloat(inc)).toFixed(2))}
                    className="py-1.5 rounded-xl border border-gray-100 text-[10px] font-black text-gray-500 hover:bg-gray-50 hover:text-[#9333EA] transition-colors"
                  >
                    +{inc} ETH
                  </button>
                ))}
              </div>

              <Button 
                onClick={() => handleBid()} 
                className="w-full bg-[#2D2A70] hover:bg-[#1E1C4A] text-white font-black py-6 rounded-2xl text-lg shadow-lg shadow-indigo-900/20 group"
              >
                Place Bid
                <TrendingUp className="w-5 h-5 ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}
        </CardContent>

        <CardFooter className="px-6 py-4 pt-0">
          <div className="w-full flex justify-between items-center bg-gray-50/50 p-3 rounded-2xl border border-gray-100/50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#9333EA]" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Leading:</span>
              <span className="text-[10px] font-black text-[#2D2A70]">
                {auction.highestBidder === "0x0000...0000" ? "No bids" : `Bidder_${auction.highestBidder.slice(2, 5)}`}
              </span>
            </div>
            <span className="text-[10px] font-bold text-gray-300">#{auction.id}</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
