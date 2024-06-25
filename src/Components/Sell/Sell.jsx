import React, { useEffect, useState } from "react";
import { getStockData } from "../../Api/auth";
import Card from "./Card";
import Navbar from "../../Utilis/Navbar/Navbar";
import BalanceDisplay from "../../Utilis/BalanceDisplay/BalanceDisplay";
import Loader from "../../Utilis/Loader/Loader";
import { ToastContainer } from "react-toastify";

export default function Sell() {
  const [userStockInfo, setUserStockInfo] = useState([]);

  useEffect(() => {
    const func = async () => {
      try {
        const data = await getStockData();
        console.log("selling");
        // console.log(data?.portfolio_user?.portfolio_user);
        setUserStockInfo(data?.portfolio_user?.portfolio_user);
      } catch (e) {
        console.log(e);
      }
    };
    func();
  }, []);
  return (
    // <div className="container   mx-auto p-4">
    //   <h1 className="text-5xl  my-3 flex font-extrabold mb-4 text-[#52057B] justify-center items-center">Sell Stocks</h1>
    //   <div className="">
    //     <p className="mb-2 md-3 text-grey-800 font-bold text-3xl">Balance: {userStockInfo.balance}</p>
    //     {userStockInfo?.portfolio?.map((stock, index) => (
    //       <div key={index} className="mb-4">
    //         <Card
    //           stockName={stock.stockName}
    //           stockQuantity={stock.stockRemainigQuantity}
    //         />
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <>
      <Navbar />
      <div style={{ width: "100vw", display: "flex", justifyContent: "flex-end" }}>
        <BalanceDisplay />
      </div>
      <section style={{ minHeight: "100vh", width: "100vw" }} className="row">
        <div className="col-md-6" style={{ marginTop: "-20px" }}>
          <div className="flex flex-col w-full items-center p-4">
            {/* <Sidebar_responsive /> */}
            <div className="w-full max-w-md flex-grow p-4">
              <div className="text-[#52057B] font-extrabold text-5xl  flex items-center justify-center">Sell Stocks</div>
              <div className="flex flex-col sm:flex-row  my-7 justify-center items-center">
                <input
                  className="border-2 border-lightpurple bg-purple-100 p-2.5 rounded-md mb-2 sm:mb-0 sm:mr-2 w-full sm:w-48"
                  placeholder="Enter Stock Name"
                  // onChange={(e) => setStockName(e.target.value)}
                />
                <button
                  className="p-2.5 bg-[#7743DB] text-white rounded-lg hover:bg-[#C3ACD0] hover:text-black mb-2 sm:mb-0 w-full sm:w-48"
                  // onClick={handleSubmit}
                >
                  Get Details
                </button>
              </div>
              {/* {gettingDetails && <center><div ><Loader /></div></center>} */}


              <div className="flex justify-center items-center mt-4">
                {/* {stockInfo && !gettingDetails && (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <div className="text-black grid grid-cols-2 grid-rows-2 gap-5 p-4 rounded-md w-full sm:w-48 shadow-md" style={{ width: "100%", border: "1px solid purple" }}>
                      <p className="text-lg font-bold" style={{ color: "green" }}>Open: {stockInfo.open}</p>
                      <p className="text-lg font-bold">Low: {stockInfo.low}</p>
                      <p className="text-lg font-bold" >High: {stockInfo.high}</p>
                      <p className="text-lg font-bold" style={{ color: "red" }}>Close: {stockInfo.close}</p>
                    </div>
                    <p style={{ fontWeight: "bold" }}>Note: These stock prices are from one minute ago.</p>
                    <div className="flex flex-col sm:flex-row justify-center items-center mt-3">
                      <input
                        className="border-2 my-2 border-lightpurple mr-2 bg-purple-100 p-2.5 rounded-md w-full sm:w-48"
                        placeholder="Enter Quantity"
                        type="Number"
                        onChange={(e) => setStockQuantity(e.target.value)}
                      />
                      <button
                        onClick={handleBuyStock}
                        className="btn btn-outline-success w-full sm:w-48 p-2.5"
                        style={{ height: "100%" }}
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                )} */}
              </div>



            </div>
            <div className="w-full">

            </div>
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
        </div>
        {/* {!gettingDetails && <div className="col-md-6">
          {chartData.length == 0 && !gettingDetails && <Lottie animationData={animation} className="sm:max-w-1/2" style={{ height: "600px" }} />}
          {gettingDetails && <div ><Loader /></div>}
          {chartData.length > 0 && (
            <div style={{ marginTop: "130px" }}>
              <CandlestickChart data={chartData} options={chartOptions} loader={<div>Loading Chart</div>} />
            </div>
          )}
        </div>}
        {gettingDetails && <div className="col-md-6" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {gettingDetails && <div ><Loader /></div>}
        </div>} */}
      </section>

    </>
  );
}
