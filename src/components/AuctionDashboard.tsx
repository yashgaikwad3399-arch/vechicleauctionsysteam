import { useWeb3 } from "../hooks/useWeb3";
import { AuctionCard } from "./AuctionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LayoutGrid, History, Info, PlayCircle, Scale, Calendar } from "lucide-react";
import { Button } from "./ui/button";

export const AuctionDashboard = () => {
  const { auctions, loading, isConnected } = useWeb3();

  const activeAuctions = auctions.filter(a => a.active);
  const endedAuctions = auctions.filter(a => a.ended);

  return (
    <div className="w-full">
      <Tabs defaultValue="active" className="w-full">
        <div className="flex flex-col items-center gap-8 mb-12">
          <TabsList className="bg-gray-100 p-1 rounded-2xl border border-gray-200 h-auto">
            <TabsTrigger 
              value="active" 
              className="px-8 py-4 rounded-xl data-[state=active]:bg-[#FF6321] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#FF6321]/20 font-black text-xs uppercase tracking-widest transition-all"
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Live Events
            </TabsTrigger>
            <TabsTrigger 
              value="open" 
              className="px-8 py-4 rounded-xl data-[state=active]:bg-[#9333EA] data-[state=active]:text-white font-black text-xs uppercase tracking-widest transition-all"
            >
              <Scale className="w-4 h-4 mr-2" />
              Open Auction
            </TabsTrigger>
            <TabsTrigger 
              value="ended" 
              className="px-8 py-4 rounded-xl data-[state=active]:bg-[#2D2A70] data-[state=active]:text-white font-black text-xs uppercase tracking-widest transition-all"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Past Events
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
            <Info className="w-3 h-3 text-[#9333EA]" />
            <span>Smart Contract Secured Transactions</span>
          </div>
        </div>

        <TabsContent value="active" className="mt-0">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-[500px] rounded-[32px] bg-gray-50 animate-pulse border border-gray-100" />
              ))}
            </div>
          ) : activeAuctions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeAuctions.map(auction => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LayoutGrid className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-xl font-black text-[#2D2A70] mb-2">No Active Auctions</h3>
              <p className="text-gray-400 font-bold max-w-xs mx-auto">Be the first to list your premium vehicle on our decentralized platform.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="ended" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-60 grayscale-[0.5]">
            {endedAuctions.map(auction => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      {!isConnected && (
        <div className="mt-24 p-12 rounded-[40px] bg-gradient-to-br from-[#9333EA]/5 to-[#6366F1]/5 border border-[#9333EA]/10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#9333EA]/5 rounded-full blur-[80px] -mr-32 -mt-32" />
          <h3 className="text-3xl font-black text-[#2D2A70] mb-4">Ready to start bidding?</h3>
          <p className="text-gray-500 font-medium mb-8 max-w-md mx-auto">
            Connect your MetaMask wallet to participate in secure, transparent auctions powered by Ethereum smart contracts.
          </p>
          <Button className="bg-[#2D2A70] hover:bg-[#1E1C4A] text-white font-black px-10 py-7 rounded-2xl text-lg shadow-xl shadow-indigo-900/20">
            Connect Wallet Now
          </Button>
        </div>
      )}
    </div>
  );
};
