import * as React from "react";
import { useWeb3 } from "../hooks/useWeb3";
import { Button } from "./ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Plus, Car, Info } from "lucide-react";
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const CreateAuctionDialog = () => {
  const { createAuction, isConnected } = useWeb3();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    vehicleType: "Car",
    make: "",
    model: "",
    imageUrl: "",
    minBid: "",
    duration: "86400", // 24 hours in seconds
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createAuction({
      ...formData,
      endTime: Date.now() + parseInt(formData.duration) * 1000,
    });
    setOpen(false);
    setFormData({
      vehicleType: "Car",
      make: "",
      model: "",
      imageUrl: "",
      minBid: "",
      duration: "86400",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
          <Plus className="w-4 h-4 mr-2" />
          Create Auction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-tight">List Your Vehicle</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in the details to start a decentralized auction.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Type</label>
              <Select 
                value={formData.vehicleType}
                onValueChange={(value) => setFormData({...formData, vehicleType: value})}
              >
                <SelectTrigger className="bg-zinc-900 border-white/10">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-950 border-white/10 text-white">
                  <SelectItem value="Car">Car</SelectItem>
                  <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                  <SelectItem value="Truck">Truck</SelectItem>
                  <SelectItem value="SUV">SUV</SelectItem>
                  <SelectItem value="Classic">Classic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Min Bid (ETH)</label>
              <Input 
                type="number" 
                step="0.01"
                placeholder="0.5" 
                value={formData.minBid}
                onChange={(e) => setFormData({...formData, minBid: e.target.value})}
                className="bg-zinc-900 border-white/10"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Make</label>
              <Input 
                placeholder="e.g. Porsche" 
                value={formData.make}
                onChange={(e) => setFormData({...formData, make: e.target.value})}
                className="bg-zinc-900 border-white/10"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Model</label>
              <Input 
                placeholder="e.g. 911 GT3" 
                value={formData.model}
                onChange={(e) => setFormData({...formData, model: e.target.value})}
                className="bg-zinc-900 border-white/10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image URL</label>
            <Input 
              placeholder="https://..." 
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
              className="bg-zinc-900 border-white/10"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Duration</label>
            <Select 
              value={formData.duration}
              onValueChange={(value) => setFormData({...formData, duration: value})}
            >
              <SelectTrigger className="bg-zinc-900 border-white/10">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-950 border-white/10 text-white">
                <SelectItem value="3600">1 Hour</SelectItem>
                <SelectItem value="86400">24 Hours</SelectItem>
                <SelectItem value="259200">3 Days</SelectItem>
                <SelectItem value="604800">7 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex gap-3 items-start">
            <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Creating an auction requires a blockchain transaction. Gas fees will apply. Ensure your MetaMask is connected to the correct network.
            </p>
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              Launch Auction
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
