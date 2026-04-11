export const VEHICLE_AUCTION_ABI = [
  "function auctionCount() view returns (uint256)",
  "function auctions(uint256) view returns (uint256 id, address payable seller, string vehicleType, string make, string model, string imageUrl, uint256 minBid, uint256 highestBid, address highestBidder, uint256 endTime, bool active, bool ended)",
  "function createAuction(string _vehicleType, string _make, string _model, string _imageUrl, uint256 _minBid, uint256 _duration)",
  "function placeBid(uint256 _auctionId) payable",
  "function withdraw(uint256 _auctionId) returns (bool)",
  "function endAuction(uint256 _auctionId)",
  "function getAuction(uint256 _id) view returns (tuple(uint256 id, address seller, string vehicleType, string make, string model, string imageUrl, uint256 minBid, uint256 highestBid, address highestBidder, uint256 endTime, bool active, bool ended))",
  "event AuctionCreated(uint256 id, address seller, string make, string model)",
  "event BidPlaced(uint256 auctionId, address bidder, uint256 amount)",
  "event AuctionEnded(uint256 auctionId, address winner, uint256 amount)"
];

// Placeholder address - in a real app, this would be the deployed contract address
export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";
