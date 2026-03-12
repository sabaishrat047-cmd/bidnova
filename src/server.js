const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

const auctions = [
  {
    id: 1,
    itemName: "Gaming Laptop",
    description: "RTX graphics, 16GB RAM, 1TB SSD",
    basePrice: 50000,
    currentBid: 50000,
    highestBidder: "System",
  },
  {
    id: 2,
    itemName: "Smartphone",
    description: "128GB, AMOLED display, 5G support",
    basePrice: 18000,
    currentBid: 18000,
    highestBidder: "System",
  },
  {
    id: 3,
    itemName: "Mechanical Keyboard",
    description: "RGB backlit, hot-swappable switches",
    basePrice: 3500,
    currentBid: 3500,
    highestBidder: "System",
  },
];

app.get("/api/auctions", (req, res) => {
  res.json(auctions);
});

app.post("/api/auctions/:id/bids", (req, res) => {
  const id = Number(req.params.id);
  const { bidderName, bidAmount } = req.body;

  const auction = auctions.find((item) => item.id === id);
  if (!auction) {
    return res.status(404).json({ message: "Auction not found." });
  }

  if (!bidderName || typeof bidderName !== "string") {
    return res.status(400).json({ message: "Bidder name is required." });
  }

  const numericBid = Number(bidAmount);
  if (Number.isNaN(numericBid)) {
    return res.status(400).json({ message: "Bid amount must be a number." });
  }

  if (numericBid <= auction.currentBid) {
    return res.status(400).json({
      message: `Bid must be greater than current bid (${auction.currentBid}).`,
    });
  }

  auction.currentBid = numericBid;
  auction.highestBidder = bidderName.trim();

  return res.status(201).json({
    message: "Bid placed successfully.",
    auction,
  });
});

app.listen(PORT, () => {
  console.log(`BidNova server running at http://localhost:${PORT}`);
});
