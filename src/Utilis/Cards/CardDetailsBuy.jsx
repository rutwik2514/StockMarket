import React from 'react';

function CardDetailsBuy({ stockName, stockQuantity, stockBuyPrice, stockBuyDate }) {
  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4 bg-green-50">
      <h2 className="text-lg font-semibold bg-green-50 mb-2">Buy: {stockName}</h2>
      <p className="text-gray-600 bg-green-50 mb-1"><strong className='bg-green-50'>Quantity:</strong> {stockQuantity}</p>
      <p className="text-gray-600 bg-green-50 mb-1"><strong className='bg-green-50'>Buy Price:</strong> {stockBuyPrice}</p>
      <p className="text-gray-600 bg-green-50"><strong className='bg-green-50'>Buy Date:</strong> {stockBuyDate}</p>
    </div>
  );
}

export default CardDetailsBuy;
