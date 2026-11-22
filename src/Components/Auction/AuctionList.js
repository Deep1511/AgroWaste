import React from 'react';
import { User } from 'lucide-react';
import "./Chat.css";

function AuctionList({ bids = [], user = "" }) {
  if (!bids.length) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '14px' }}>
        No bids placed in this room yet. Be the first to place a starting bid!
      </div>
    );
  }

  return (
    <div className="bids-feed-container">
      {bids.map((bid, idx) => {
        const isOwnBid = bid.User === user;
        const isLatest = idx === bids.length - 1;

        return (
          <div
            key={bid._id || idx}
            className={`bid-item ${isOwnBid ? 'bid-item-own' : 'bid-item-other'}`}
          >
            <div className="bid-user-info">
              <div className="bid-user-avatar">
                {isOwnBid ? <User size={16} /> : (bid.User ? bid.User.charAt(0).toUpperCase() : 'B')}
              </div>
              <div>
                <span className="bid-user-name">
                  {isOwnBid ? 'You' : bid.User}
                </span>
                {isLatest && (
                  <span style={{
                    marginLeft: '8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: '#10b981',
                    color: '#ffffff'
                  }}>
                    HIGHEST
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="bid-val-badge">₹{Number(bid.Bid).toLocaleString('en-IN')}</span>
              <span className="bid-time">
                {bid.createdAt ? new Date(bid.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AuctionList;
