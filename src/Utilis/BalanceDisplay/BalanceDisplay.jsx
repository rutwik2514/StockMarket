import React, { useState, useEffect, useRef } from 'react';
import './BalanceDisplay.css'; // Assuming you have some styles for this component

const BalanceDisplay = ({ balance }) => {
  const [isBalanceOpen, setIsBalanceOpen] = useState(false);
  const balanceRef = useRef(null);

  const handleClickOutside = (event) => {
    // Checks if click is not on sidebar
    if (isBalanceOpen && !document.querySelector('.balance-container').contains(event.target)) {
      setIsBalanceOpen(false);
    }
  };

  useEffect(() => {
    if (isBalanceOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, [isBalanceOpen]);

  const toggleBalance = () => {
    setIsBalanceOpen(!isBalanceOpen);
  };

  return (
    <div className="balance-container" ref={balanceRef} style={{marginRight:"30px", marginTop:"10px"}}>
      {!isBalanceOpen && <div className="balance-icon" onClick={toggleBalance}>
        ₹
      </div>}
      {isBalanceOpen && (
        <div className="balance-amount">
          ₹ 1000
        </div>
      )}
    </div>
  );
};

export default BalanceDisplay;
