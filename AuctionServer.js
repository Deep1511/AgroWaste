const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const AuctionModel = require('./models/Auction');
const RoomModel = require('./models/AuctionRoom');

const socketsPerTab = {};

function setupAuctionSocket(serverInstance) {
  const io = new Server(serverInstance, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    const { id: socketId } = socket;
    const { tabId } = socket.handshake.query;

    if (tabId) {
      socketsPerTab[tabId] = socketsPerTab[tabId] || 0;
      socketsPerTab[tabId]++;
    }
    console.log("A user connected to Auction socket:", socket.id);

    socket.on('disconnect', () => {
      if (tabId && socketsPerTab[tabId]) {
        socketsPerTab[tabId]--;
      }
    });

    socket.on("join room", async (data) => {
      try {
        console.log("Joining room code:", data?.Code);
        let resp = await RoomModel.findOne({ Code: data.Code });
        if (resp) {
          socket.join(data.Code);
          socket.emit("startDetails", resp);

          // Find first bid by admin and send as starting bid
          let respon = await AuctionModel.findOne({ Room: data.Code });
          if (respon) {
            socket.emit("starting_bid", respon.Bid);
          } else {
            socket.emit("starting_bid", resp.StartBid || 0);
          }

          // Latest bid is Current Highest bid
          let res = await AuctionModel.find({ Room: data.Code }).sort({ _id: -1 }).limit(1);
          if (res && res.length > 0) {
            socket.emit("curr_bid", res[0]);
          } else {
            socket.emit("curr_bid", { Bid: resp.StartBid || 0, User: "Starting Bid", Room: data.Code });
          }

          // Provide latest three bids
          let response = await AuctionModel.find({ Room: data.Code }).sort({ _id: -1 }).limit(3);
          response.reverse();
          socket.emit("bids", [...response]);
        } else {
          socket.emit("room_error", data.Code);
          console.log("Invalid Room code requested:", data.Code);
        }
      } catch (err) {
        console.error("Error in join room:", err);
      }
    });

    socket.on('send_bid', async (data) => {
      try {
        console.log("Bid event received:", data);
        if (!data.user) {
          socket.emit("auth_error", { msg: "Authentication required to place bid" });
        } else {
          let resp = await AuctionModel.find({ Room: data.Code }).sort({ _id: -1 }).limit(1);
          let res = resp && resp.length > 0 ? resp[0] : null;

          if ((res && res.Bid < data.bid) || !res) {
            io.sockets.in(data.Code).emit('receive_bid', { Bid: data.bid, User: data.user, Room: data.Code });
            io.sockets.in(data.Code).emit("curr_bid", { Bid: data.bid, User: data.user, Room: data.Code });
            await AuctionModel.create({ Bid: data.bid, User: data.user, Room: data.Code });
          } else {
            socket.emit("error_bid", res);
          }
        }
      } catch (err) {
        console.error("Error in send_bid:", err);
      }
    });
  });

  return io;
}

// Create standalone HTTP server for backwards-compatibility
const standaloneApp = express();
const AuctionServer = http.createServer(standaloneApp);
setupAuctionSocket(AuctionServer);

AuctionServer.setupAuctionSocket = setupAuctionSocket;
module.exports = AuctionServer;
