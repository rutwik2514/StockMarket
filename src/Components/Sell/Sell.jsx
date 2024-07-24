import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {getMonthlyData, getStock, handleSell} from '../../Api/auth'
// import { ChartDisplay } from "./Chart";
import { Linechart } from "../../Utilis/Charts/LineChart";

function Card({ stockName, stockQuantity }) {
  const navigate = useNavigate();
  const [sellQuantity, setSellQuantity] = useState(0);
  const [showSellInput, setShowSellInput] = useState(false);
  const [stockInfo, setStockInfo] = useState(null);
  const [date,setDate]=useState([]);
  const [low,setLow]=useState([]);
  const [chartData, setChartData] = useState(null);
  const [chartOptions, setChartOptions] = useState(null);
  const handleGetdetails = () => {
    navigate(`/details/${stockName}`);
  };
  const handleSellStocks = async() => {
    // Implement the sell functionality here
    console.log(`Selling ${stockQuantity} stocks of ${stockName}`);
    // Reset the sell quantity after selling
    if (showSellInput == false) setShowSellInput(true);
    else setShowSellInput(false);
    try {
      const response = await getStock(stockName);
      setStockInfo(response.stockInfo[0]);
    } catch (e) {
      console.log(e);
    }
    try {
      const res = await getMonthlyData(stockName);
      // toast.success(res.message);
      low.length=0;
      date.length=0;
      console.log("monthly response is ",res.startingEntries);
      res.startingEntries.map((item)=>{
        const temp=date;
        temp.push(item.date);
        setDate(temp);
        const temp2=low;
        temp2.push(Number(item.low));
        console.log(item.low)
        setLow(temp2);
      })
      date.reverse();
      low.reverse();
      const data = [
        ["Date", "Price of stock"],
        ...low.map((y, index) => [ date[index],y])
      ];
      
      const options= {
        title: "Price vs Date",
        hAxis: { title: "Date", titleTextStyle: { color: "#333" } },
        vAxis: { minValue: 0 },
        backgroundColor:'#FFFBF5',
        chartArea: { width: "50%", height: "70%" },
      };
      setChartData(data);
      setChartOptions(options);
      // console.log(res);
    } catch (e) {
      // toast.error("Error in showing Graph");
      // console.log(e);
    }
    //  console.log()
  };

  const handleConfirmSell = async() => {
     console.log("handle confirm sell",sellQuantity)
     if(sellQuantity>stockQuantity)
      {
         toast.error("Dont have enough Stocks to Sell")
      }
      try{
        const response= await handleSell(stockName,sellQuantity);
        if (response?.error == null) {
           toast.success("Portfolio Updated Successfully");
        } else {
          toast.error(response.error);
        }
      }catch(e)
      {
        toast.error("Something Error Occured");
      }
    
   
  };
  return (
    <div className="w-full p-6 sm:w-full   rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full">
        <h5 className="mb-2 text-2xl font-bold tracking-tight dark:bg-gray-800 text-[#FFFBF5]">
          StockName: {stockName}
        </h5>
      </div>
      <div>
        <h5 className="mb-2 text-2xl font-bold tracking-tight dark:bg-gray-800 text-[#FFFBF5]">
          StockQuantity: {stockQuantity}
        </h5>
      </div>
      <button
        onClick={() => handleGetdetails()}
        className="inline-flex items-center  px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Get Details{" "}
      </button>
      <button
        onClick={handleSellStocks}
        className="inline-flex items-center ml-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {" "}
        Sell Stocks
      </button>
      {showSellInput && (
        <div className="mt-4 w-full">
          <input
            type="number"
            placeholder="Enter quantity to sell"
            onChange={(e)=>{
              setSellQuantity(e.target.value)
            }}
            className="border m-2 border-gray-300 rounded-md p-2 mb-2"
          />
          {stockInfo && (
            <div className="flex-row gap-4">
                <div className=" rounded-md flex-col p-2">
              <p className="text-lg font-bold text-black">Open: {stockInfo.open}</p>
              <p className="text-lg font-bold text-black">Close: {stockInfo.close}</p>
              <p className="text-lg font-bold text-black">Low: {stockInfo.low}</p>
              <p className="text-lg font-bold text-black">High: {stockInfo.high}</p>
            </div>
         
            </div>
          
          )}
          <button
            onClick={handleConfirmSell}
            className="bg-green-500 text-white px-4 m-1 p-2 rounded-md "
          >
            Confirm Sell
          </button>
          <div className="w-full">
        {date.length > 0 && (
          <Linechart data={chartData} options={chartOptions} />
        )}
      </div>
        </div>
      )}
       <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    </div>
  );
}

export default Card;