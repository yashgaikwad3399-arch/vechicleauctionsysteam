// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title VehicleAuction
 * @dev A decentralized vehicle auction system
 */
contract VehicleAuction {
    struct Auction {
        uint256 id;
        address payable seller;
        string vehicleType;
        string make;
        string model;
        string imageUrl;
        uint256 minBid;
        uint256 highestBid;
        address highestBidder;
        uint256 endTime;
        bool active;
        bool ended;
    }

    uint256 public auctionCount;
    mapping(uint256 => Auction) public auctions;
    mapping(uint256 => mapping(address => uint256)) public pendingReturns;

    event AuctionCreated(uint256 id, address seller, string make, string model);
    event BidPlaced(uint256 auctionId, address bidder, uint256 amount);
    event AuctionEnded(uint256 auctionId, address winner, uint256 amount);

    function createAuction(
        string memory _vehicleType,
        string memory _make,
        string memory _model,
        string memory _imageUrl,
        uint256 _minBid,
        uint256 _duration
    ) public {
        auctionCount++;
        auctions[auctionCount] = Auction({
            id: auctionCount,
            seller: payable(msg.sender),
            vehicleType: _vehicleType,
            make: _make,
            model: _model,
            imageUrl: _imageUrl,
            minBid: _minBid,
            highestBid: 0,
            highestBidder: address(0),
            endTime: block.timestamp + _duration,
            active: true,
            ended: false
        });

        emit AuctionCreated(auctionCount, msg.sender, _make, _model);
    }

    function placeBid(uint256 _auctionId) public payable {
        Auction storage auction = auctions[_auctionId];
        require(auction.active, "Auction is not active");
        require(block.timestamp < auction.endTime, "Auction already ended");
        require(msg.value > auction.minBid, "Bid must be higher than minimum bid");
        require(msg.value > auction.highestBid, "There is already a higher bid");

        if (auction.highestBidder != address(0)) {
            pendingReturns[_auctionId][auction.highestBidder] += auction.highestBid;
        }

        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;

        emit BidPlaced(_auctionId, msg.sender, msg.value);
    }

    function withdraw(uint256 _auctionId) public returns (bool) {
        uint256 amount = pendingReturns[_auctionId][msg.sender];
        if (amount > 0) {
            pendingReturns[_auctionId][msg.sender] = 0;
            if (!payable(msg.sender).send(amount)) {
                pendingReturns[_auctionId][msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    function endAuction(uint256 _auctionId) public {
        Auction storage auction = auctions[_auctionId];
        require(block.timestamp >= auction.endTime, "Auction not yet ended");
        require(!auction.ended, "Auction end already called");

        auction.ended = true;
        auction.active = false;

        if (auction.highestBidder != address(0)) {
            auction.seller.transfer(auction.highestBid);
        }

        emit AuctionEnded(_auctionId, auction.highestBidder, auction.highestBid);
    }

    function getAuction(uint256 _id) public view returns (Auction memory) {
        return auctions[_id];
    }
}
