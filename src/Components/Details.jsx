// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getStockData } from "../Api/auth";

// import CardDetailsSell from "../Utilis/Cards/CardDetailsSell";
// import CardDetailsBuy from "../Utilis/Cards/CardDetailsBuy";

// function Details() {
//   const { stockName } = useParams();
//   const [userStockInfo, setUserStockInfo] = useState([]);
//   const [array, setArray] = useState([]);

//   useEffect(() => {
//     const func = async () => {
//       try {
//         const data = await getStockData();
//         // console.log("jiijij");
//         // console.log(data?.portfolio_user?.portfolio_user);
//         setUserStockInfo(data?.portfolio_user?.portfolio_user);
//       } catch (e) {
//         console.log(e);
//       }
//     };
//     func();
//   }, []);
//   useEffect(() => {
//     const newArray = [];
//     if (userStockInfo?.portfolio) {
//       userStockInfo?.portfolio
//         ?.filter((stock) => stock.stockName === stockName)
//         .map((filteredStock) => (
//           <div key={filteredStock.stockName}>
//             {/* console.log(singleStock.stockBuyDate) */}
//             {filteredStock.stockBuyingPrice.forEach((singleStock) => {
//               newArray.push({
//                 stockName: stockName,
//                 Quantity: singleStock.stockBuyQuantity,
//                 Date: new Date(singleStock.stockBuyDate),
//                 Type: "Buy",
//               });
//             })}
//             {filteredStock.stockSell.forEach((singleStock) => {
//               newArray.push({
//                 stockName: stockName,
//                 Quantity: singleStock.stockSellQuantity,
//                 Date: new Date(singleStock.stockSellDate.replace(" ", "T")),
//                 Type: "Sell",
//               });
//             })}
//           </div>
//         ));
//     }
//     newArray.sort((a, b) => new Date(a.Date) - new Date(b.Date));

//     newArray.reverse();
//     setArray(newArray);
//   }, [userStockInfo]);
//   return (
//     <div>
//       <div className=" flex m-4 text-5xl font-extrabold text-[#52057B] item-center justify-center">History</div>
//       {array.map((item, index) => (
//         <div key={index} className={`${item.Type==='Sell'?"bg-[#eb5656]":"bg-[#70cf7a]"} m-5 p-6 rounded-lg shadow-md`}>
//         <h2 className={`${item.Type==='Sell'?"bg-[#eb5656]":"bg-[#70cf7a]"} text-2xl   font-extrabold mb-2`}>Name:{item.stockName}</h2>
//         <h2 className={`text-black ${item.Type==='Sell'?"bg-[#eb5656]":"bg-[#70cf7a]"} font-extrabold  mb-4`}>Quantity:{item.Quantity}</h2>
//         <h2 className={`text-black  ${item.Type==='Sell'?"bg-[#eb5656]":"bg-[#70cf7a]"} font-extrabold  mb-4`}>Date:{item.Date.toString()}</h2>
//         <h2 className={`text-black ${item.Type==='Sell'?"bg-[#eb5656]":"bg-[#70cf7a]"}  font-extrabold  mb-4`}>Type:{item.Type}</h2>

//       </div>
//       ))}
//     </div>
//   );
// }

// export default Details;
