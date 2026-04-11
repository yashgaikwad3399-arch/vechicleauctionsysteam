export interface Auction {
  id: number;
  seller: string;
  vehicleType: string;
  make: string;
  model: string;
  imageUrl: string;
  minBid: string; // in ETH
  highestBid: string; // in ETH
  highestBidder: string;
  endTime: number;
  active: boolean;
  ended: boolean;
}

export interface Web3State {
  account: string | null;
  chainId: number | null;
  balance: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
}
