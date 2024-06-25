import React from 'react';

function CardDetailsSell({ stockName, stockSellQuantity, stockSellPrice, stockSellDate }) {
  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4 bg-red-50">
      <h2 className="text-lg bg-red-50 font-semibold mb-2">Sell: {stockName}</h2>
      <p className="text-gray-600 bg-red-50 mb-1"><strong className='bg-red-50'>Quantity:</strong> {stockSellQuantity}</p>
      <p className="text-gray-600 bg-red-50 mb-1"><strong className='bg-red-50'>Sell Price:</strong> {stockSellPrice}</p>
      <p className="text-gray-600 bg-red-50"><strong className='bg-red-50'>Sell Date:</strong> {stockSellDate}</p>
    </div>
  );
}

export default CardDetailsSell;
