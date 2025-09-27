import React from 'react';

const OrdersPanel = ({ pendingOrders, optionsPositions, currentPrices, onCancelOrder, holdings }) => {
  return (
    <div className="orders-panel">
      <div className="orders-tabs">
        <div className="orders-section">
          <h3>📋 Pending Orders</h3>
          <div className="orders-list">
            {pendingOrders.length === 0 ? (
              <p className="no-orders">No pending orders</p>
            ) : (
              pendingOrders.map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-header">
                    <span className={`order-type ${order.type}`}>{order.type.toUpperCase()}</span>
                    <span className={`order-action ${order.action}`}>{order.action}</span>
                    <button 
                      className="cancel-order-btn"
                      onClick={() => onCancelOrder(order.id)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="order-details">
                    <span>{order.stock.toUpperCase()}</span>
                    <span>Qty: {order.quantity}</span>
                    <span>Price: ₹{order.price}</span>
                    {order.trailingPercent && <span>Trail: {order.trailingPercent}%</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="options-section">
          <h3>⚡ Options Positions</h3>
          <div className="options-list">
            {optionsPositions.length === 0 ? (
              <p className="no-options">No options positions</p>
            ) : (
              optionsPositions.map(option => (
                <div key={option.id} className="option-item">
                  <div className="option-header">
                    <span className={`option-type ${option.type}`}>
                      {option.type.toUpperCase()} CALL
                    </span>
                    <span className="option-stock">{option.stock.toUpperCase()}</span>
                  </div>
                  <div className="option-details">
                    <span>Strike: ₹{option.strikePrice}</span>
                    <span>Premium: ₹{option.premium}</span>
                    <span>Qty: {option.quantity}</span>
                    <span>Current: ₹{currentPrices[option.stock]}</span>
                  </div>
                  <div className="option-pnl">
                    P&L: ₹{((currentPrices[option.stock] - option.strikePrice) * option.quantity * 100 - option.premium * 100).toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="short-positions">
          <h3>📉 Short Positions</h3>
          <div className="short-list">
            {Object.entries(holdings).filter(([_, holding]) => holding.shortQuantity > 0).length === 0 ? (
              <p className="no-shorts">No short positions</p>
            ) : (
              Object.entries(holdings).map(([stock, holding]) => 
                holding.shortQuantity > 0 && (
                  <div key={stock} className="short-item">
                    <div className="short-header">
                      <span>{stock.toUpperCase()}</span>
                      <span className="short-quantity">-{holding.shortQuantity}</span>
                    </div>
                    <div className="short-details">
                      <span>Avg: ₹{holding.shortAvgPrice.toFixed(2)}</span>
                      <span>Current: ₹{currentPrices[stock].toFixed(2)}</span>
                      <span className={`pl ${currentPrices[stock] < holding.shortAvgPrice ? 'profit' : 'loss'}`}>
                        P&L: ₹{(holding.shortQuantity * (holding.shortAvgPrice - currentPrices[stock])).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPanel;