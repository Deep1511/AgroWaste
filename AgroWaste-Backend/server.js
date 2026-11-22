const path = require('path');
process.env.NODE_CONFIG_DIR = path.resolve(__dirname, 'config');
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./api/auth');
const AuctionServer = require('./AuctionServer');

const app = express();

// Connect to MongoDB
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));

app.use('/', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const AUCTION_PORT = process.env.AUCTION_PORT || 3001;
AuctionServer.listen(AUCTION_PORT, () => {
  console.log(`AuctionServer is running on port ${AUCTION_PORT}`);
});
