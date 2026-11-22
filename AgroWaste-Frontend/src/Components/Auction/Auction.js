import React, { useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import AuctionList from './AuctionList';
import DeepContext from '../../context/DeepContext';
import { SOCKET_URL } from '../../apiConfig';
import {
  Gavel,
  Trophy,
  ArrowRight,
  DollarSign
} from 'lucide-react';
import "./Chat.css";

const socket = io(SOCKET_URL);

function Auction() {
  const { showAlert, user } = useContext(DeepContext);

  const [code, setCode] = useState('');
  const [joined, setJoined] = useState(false);
  const [roomDetails, setRoomDetails] = useState(null);

  const [amount, setAmount] = useState('');
  const [bids, setBids] = useState([]);
  const [start, setStart] = useState(0);
  const [hig, setHig] = useState(0);
  const [cUser, setCUser] = useState('');
  const [endDate, setEndDate] = useState('');
  const [nowDate, setNowDate] = useState(new Date());

  const currentUsername = user?.name || "Guest Participant";

  useEffect(() => {
    socket.on("room_error", () => {
      if (showAlert) showAlert("Room code not found. Please verify the code and try again.", "danger");
      setJoined(false);
    });

    socket.on("starting_bid", (data) => {
      setStart(data || 0);
    });

    socket.on("startDetails", (data) => {
      setRoomDetails(data);
      if (data?.endDate) {
        setEndDate(new Date(data.endDate).toLocaleString());
      }
      setJoined(true);
      if (showAlert) showAlert(`Joined auction room: ${data?.Name || 'Live Arena'}`, "success");
    });

    socket.on("curr_bid", (data) => {
      if (data) {
        setHig(data.Bid || 0);
        setCUser(data.User || '');
      }
    });

    socket.on("bids", (data) => {
      if (Array.isArray(data)) {
        setBids(data);
      }
    });

    socket.on("receive_bid", (data) => {
      setBids(prev => {
        const exists = prev.some(b => b.Bid === data.Bid && b.User === data.User);
        return exists ? prev : [...prev, data];
      });
      if (data?.Bid) {
        setHig(data.Bid);
        setCUser(data.User);
      }
    });

    socket.on("auth_error", (data) => {
      if (showAlert) showAlert(data.msg || "Authentication required to place bids", "warning");
    });

    socket.on("error_bid", () => {
      if (showAlert) showAlert("Your bid must be higher than the current highest bid.", "danger");
    });

    const timer = setInterval(() => {
      setNowDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
      socket.off("room_error");
      socket.off("starting_bid");
      socket.off("startDetails");
      socket.off("curr_bid");
      socket.off("bids");
      socket.off("receive_bid");
      socket.off("auth_error");
      socket.off("error_bid");
    };
  }, [showAlert]);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (!code.trim()) {
      if (showAlert) showAlert("Please enter an auction room code.", "warning");
      return;
    }
    socket.emit('join room', { Code: code.trim().toUpperCase() });
  };

  const handlePlaceBid = (e) => {
    e.preventDefault();
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= hig) {
      if (showAlert) showAlert(`Your bid must be higher than the current highest bid (₹${hig.toLocaleString('en-IN')})`, "warning");
      return;
    }

    socket.emit('send_bid', {
      bid: numericAmount,
      Code: code.trim().toUpperCase(),
      user: currentUsername
    });

    setAmount('');
  };

  const handleQuickAdd = (increment) => {
    const nextBid = (hig || start || 0) + increment;
    setAmount(String(nextBid));
  };

  const isConcluded = roomDetails?.endDate && new Date(roomDetails.endDate).getTime() < nowDate.getTime();

  return (
    <div className="auction-arena-container">
      {!joined ? (
        /* Join Room Card */
        <div className="join-room-card">
          <div className="join-icon-box">
            <Gavel size={32} />
          </div>
          <h1 className="join-title">Enter Auction Room</h1>
          <p className="join-desc">
            Enter your designated Room Code to join live bidding on agricultural residue lots
          </p>

          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="e.g. ROOM401"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="room-code-input"
              autoFocus
            />
            <button
              type="submit"
              className="auth-submit-btn btn-company"
              style={{ width: '100%', height: '50px' }}
            >
              <span>Join Live Arena</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      ) : (
        /* Live Arena Interface */
        <>
          {/* Header Bar */}
          <div className="arena-header-bar">
            <div className="arena-title-area">
              <span className="arena-status-pill">
                ● {isConcluded ? "Auction Concluded" : "Live Bidding Active"}
              </span>
              <h2 className="arena-name">{roomDetails?.Name || "Auction Arena"}</h2>
              <span className="arena-room-code">Room Code: {code}</span>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase' }}>
                End Schedule
              </div>
              <div style={{ fontSize: '14.5px', fontWeight: 600 }}>
                {endDate || 'N/A'}
              </div>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="arena-highlights-grid">
            <div className="highlight-box">
              <span className="highlight-lbl">Starting Price</span>
              <div className="highlight-amt">₹{Number(start).toLocaleString('en-IN')}</div>
              <span className="highlight-sub">Lot Reserve Price</span>
            </div>

            <div className="highlight-box highlight-active">
              <span className="highlight-lbl" style={{ color: '#059669' }}>
                Current Highest Bid
              </span>
              <div className="highlight-amt green">₹{Number(hig || start).toLocaleString('en-IN')}</div>
              <span className="highlight-sub" style={{ color: '#059669', fontWeight: 700 }}>
                Leading: {cUser === currentUsername ? '👑 You are leading!' : (cUser || 'No bids yet')}
              </span>
            </div>

            <div className="highlight-box">
              <span className="highlight-lbl">Your Identity</span>
              <div className="highlight-amt" style={{ fontSize: '20px' }}>{currentUsername}</div>
              <span className="highlight-sub">Logged in Participant</span>
            </div>
          </div>

          {/* Arena Main Card */}
          <div className="arena-main-card">
            {isConcluded ? (
              <div style={{
                textAlign: 'center',
                padding: '48px 24px',
                borderRadius: '16px',
                background: '#ecfdf5',
                border: '1.5px solid #a7f3d0'
              }}>
                <Trophy size={48} color="#059669" style={{ margin: '0 auto 16px auto' }} />
                <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#065f46', marginBottom: '8px' }}>
                  {cUser === currentUsername ? "Congratulations! You Won the Auction! 🏆" : `${cUser || 'Winner'} won this auction lot!`}
                </h2>
                <p style={{ fontSize: '16px', color: '#047857' }}>
                  Final Winning Bid: <strong>₹{Number(hig).toLocaleString('en-IN')}</strong>
                </p>
              </div>
            ) : (
              <>
                <AuctionList bids={bids} user={currentUsername} />

                {/* Quick Increment Pills */}
                <div className="quick-bid-pills">
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>Quick Increments:</span>
                  {[100, 500, 1000, 5000].map((inc) => (
                    <button
                      type="button"
                      key={inc}
                      className="pill-quick-bid"
                      onClick={() => handleQuickAdd(inc)}
                    >
                      +₹{inc.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>

                {/* Place Bid Form */}
                <form onSubmit={handlePlaceBid} className="bid-form-controller">
                  <input
                    type="number"
                    min={(hig || start || 0) + 1}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={`Enter amount > ₹${hig || start || 0}...`}
                    className="bid-amount-input"
                  />
                  <button type="submit" className="btn-place-bid">
                    <DollarSign size={18} />
                    <span>Place Bid</span>
                  </button>
                </form>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Auction;
