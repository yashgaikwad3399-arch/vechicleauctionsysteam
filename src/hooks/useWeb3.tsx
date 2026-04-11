import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { ethers } from 'ethers';
import { Auction, Web3State } from '../types';
import { VEHICLE_AUCTION_ABI, CONTRACT_ADDRESS } from '../lib/contract';
import { toast } from 'sonner';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Web3ContextType extends Web3State {
  connect: () => Promise<void>;
  disconnect: () => void;
  createAuction: (vehicle: Omit<Auction, 'id' | 'seller' | 'highestBid' | 'highestBidder' | 'active' | 'ended'>) => Promise<void>;
  placeBid: (auctionId: number, amount: string) => Promise<void>;
  endAuction: (auctionId: number) => Promise<void>;
  auctions: Auction[];
  loading: boolean;
  gasUsed: string | null;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<Web3State>({
    account: null,
    chainId: null,
    balance: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  });

  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [gasUsed, setGasUsed] = useState<string | null>(null);

  const updateBalance = useCallback(async (account: string) => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(account);
      setState(s => ({ ...s, balance: ethers.formatEther(balance) }));
    }
  }, []);

  // Mock data for demo if MetaMask is not connected
  const MOCK_AUCTIONS: Auction[] = [
    {
      id: 1,
      seller: "0x1234...5678",
      vehicleType: "Car",
      make: "Tesla",
      model: "Model S Plaid",
      imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800",
      minBid: "1.5",
      highestBid: "2.1",
      highestBidder: "0xabcd...efgh",
      endTime: Date.now() + 86400000,
      active: true,
      ended: false,
    },
    {
      id: 2,
      seller: "0x9876...4321",
      vehicleType: "Motorcycle",
      make: "Ducati",
      model: "Panigale V4",
      imageUrl: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800",
      minBid: "0.8",
      highestBid: "1.2",
      highestBidder: "0x5555...6666",
      endTime: Date.now() + 172800000,
      active: true,
      ended: false,
    },
    {
      id: 3,
      seller: "0x4444...3333",
      vehicleType: "Truck",
      make: "Ford",
      model: "F-150 Lightning",
      imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800",
      minBid: "2.0",
      highestBid: "0",
      highestBidder: "0x0000...0000",
      endTime: Date.now() - 3600000,
      active: false,
      ended: true,
    }
  ];

  const loadAuctions = useCallback(async () => {
    setLoading(true);
    try {
      if (window.ethereum && state.isConnected) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, VEHICLE_AUCTION_ABI, provider);
        
        // In a real app, we would fetch from the contract
        // const count = await contract.auctionCount();
        // ... loop and fetch
        
        // For this demo, we'll use mock data but allow "real" interaction if address is set
        if (CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000") {
          setAuctions(MOCK_AUCTIONS);
        }
      } else {
        setAuctions(MOCK_AUCTIONS);
      }
    } catch (error) {
      console.error("Error loading auctions:", error);
      setAuctions(MOCK_AUCTIONS);
    } finally {
      setLoading(false);
    }
  }, [state.isConnected]);

  useEffect(() => {
    loadAuctions();
  }, [loadAuctions]);

  const connect = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not found. Please install it.");
      return;
    }

    setState(s => ({ ...s, isConnecting: true, error: null }));
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const network = await provider.getNetwork();
      const balance = await provider.getBalance(accounts[0]);
      
      setState({
        account: accounts[0],
        chainId: Number(network.chainId),
        balance: ethers.formatEther(balance),
        isConnected: true,
        isConnecting: false,
        error: null,
      });
      toast.success("Wallet connected!");
    } catch (error: any) {
      setState(s => ({ ...s, isConnecting: false, error: error.message }));
      toast.error("Connection failed: " + error.message);
    }
  };

  const disconnect = () => {
    setState({
      account: null,
      chainId: null,
      balance: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    });
    toast.info("Wallet disconnected");
  };

  const createAuction = async (vehicle: any) => {
    if (!state.isConnected || !window.ethereum) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Simulation of gas and transaction
      toast.loading("Creating auction on blockchain...");
      
      // In a real app:
      // const contract = new ethers.Contract(CONTRACT_ADDRESS, VEHICLE_AUCTION_ABI, signer);
      // const tx = await contract.createAuction(...);
      // const receipt = await tx.wait();
      // setGasUsed(receipt.gasUsed.toString());
      
      // Simulated delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGasUsed("154,230");
      
      if (state.account) await updateBalance(state.account);
      
      toast.dismiss();
      toast.success("Auction created successfully!");
      
      // Update local state for demo
      const newAuction: Auction = {
        id: auctions.length + 1,
        seller: state.account!,
        ...vehicle,
        highestBid: "0",
        highestBidder: "0x0000...0000",
        active: true,
        ended: false,
      };
      setAuctions(prev => [newAuction, ...prev]);
    } catch (error: any) {
      toast.dismiss();
      toast.error("Failed to create auction: " + error.message);
    }
  };

  const placeBid = async (auctionId: number, amount: string) => {
    if (!state.isConnected || !window.ethereum) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      toast.loading("Placing bid...");
      
      // Simulated delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setGasUsed("82,410");
      
      if (state.account) await updateBalance(state.account);
      
      toast.dismiss();
      toast.success(`Bid of ${amount} ETH placed!`);
      
      // Update local state for demo
      setAuctions(prev => prev.map(a => 
        a.id === auctionId 
          ? { ...a, highestBid: amount, highestBidder: state.account! } 
          : a
      ));
    } catch (error: any) {
      toast.dismiss();
      toast.error("Failed to place bid: " + error.message);
    }
  };

  const endAuction = async (auctionId: number) => {
    if (!state.isConnected || !window.ethereum) return;
    
    try {
      toast.loading("Ending auction...");
      await new Promise(resolve => setTimeout(resolve, 1500));
      setGasUsed("45,120");
      toast.dismiss();
      toast.success("Auction ended!");
      
      setAuctions(prev => prev.map(a => 
        a.id === auctionId 
          ? { ...a, active: false, ended: true } 
          : a
      ));
    } catch (error: any) {
      toast.dismiss();
      toast.error("Failed to end auction");
    }
  };

  return (
    <Web3Context.Provider value={{ 
      ...state, 
      connect, 
      disconnect, 
      createAuction, 
      placeBid, 
      endAuction,
      auctions, 
      loading,
      gasUsed
    }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) throw new Error("useWeb3 must be used within Web3Provider");
  return context;
};
