const path = require('path');
process.env.NODE_CONFIG_DIR = path.resolve(__dirname, 'config');
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const http = require('http');
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./api/auth');
const AuctionServer = require('./AuctionServer');
const { setupAuctionSocket } = AuctionServer;

const app = express();

// Connect to MongoDB
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL ? [process.env.CLIENT_URL, 'http://localhost:3000'] : '*',
  credentials: true
}));

// Health check endpoint for Render / monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', uptime: process.uptime() });
});

app.use('/', router);

// Create unified server for Express + Socket.IO (Crucial for single-port hosts like Render)
const server = http.createServer(app);
setupAuctionSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server & Auction WebSockets running on port ${PORT}`);
});

// Optionally support separate AUCTION_PORT for local development
const AUCTION_PORT = process.env.AUCTION_PORT;
if (AUCTION_PORT && String(AUCTION_PORT) !== String(PORT)) {
  AuctionServer.listen(AUCTION_PORT, () => {
    console.log(`Standalone AuctionServer also listening on port ${AUCTION_PORT}`);
  });
}
