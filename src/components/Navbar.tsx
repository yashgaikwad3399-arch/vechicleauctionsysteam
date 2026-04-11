import { useWeb3 } from "../hooks/useWeb3";
import { Button } from "./ui/button";
import { Wallet, LogOut, Car, LayoutGrid } from "lucide-react";

export const Navbar = ({ currentView, onViewChange }: { currentView: string, onViewChange: (view: string) => void }) => {
  const { isConnected, account, balance, connect, disconnect, isConnecting } = useWeb3();

  const navItems = [
    { id: "home", label: "Home" },
    { id: "membership", label: "Membership" },
    { id: "about", label: "About Us" },
    { id: "contact", label: "Contact Us" },
    { id: "blogs", label: "Blogs" },
    { id: "careers", label: "Careers" }
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onViewChange("home")}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl font-black tracking-tighter text-[#2D2A70]">VELO</span>
              <div className="bg-[#FF6321] p-1 rounded-sm">
                <span className="text-white font-bold text-sm">AUCTION</span>
              </div>
            </button>
            
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => onViewChange(item.id)}
                  className={`text-sm font-semibold transition-colors ${
                    currentView === item.id 
                      ? "text-[#9333EA] border-b-2 border-[#9333EA] pb-1" 
                      : "text-gray-600 hover:text-[#9333EA]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Balance</span>
                  <span className="text-xs font-bold text-[#2D2A70]">
                    {balance ? parseFloat(balance).toFixed(4) : "0.0000"} ETH
                  </span>
                </div>
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Wallet</span>
                  <span className="text-xs font-mono text-gray-600">
                    {account?.slice(0, 6)}...{account?.slice(-4)}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={disconnect}
                  className="text-gray-500 hover:text-red-500 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost"
                  onClick={connect} 
                  disabled={isConnecting}
                  className="text-[#9333EA] font-bold border border-[#9333EA]/20 hover:bg-[#9333EA]/5"
                >
                  {isConnecting ? "Connecting..." : "Sign In"}
                </Button>
                <Button 
                  onClick={connect} 
                  disabled={isConnecting}
                  className="bg-gradient-to-r from-[#9333EA] to-[#6366F1] text-white hover:opacity-90 font-bold px-6 shadow-lg shadow-purple-200"
                >
                  Connect Wallet
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
