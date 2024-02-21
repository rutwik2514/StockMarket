import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { renderDashboardData } from '../redux/actions/actions';
import axios from "axios"
import { Chart } from "react-google-charts";
import { ToastContainer, toast } from 'react-toastify';

function Dashboard() {
  const dashboardData = useSelector((state) => state.dashboardData)
  const dispatch = useDispatch();
  const [stockData, setStockData] = React.useState(false);
  const [pieData, setPieData] = React.useState();


  // getting all user data as soon as dashboard page is rendered
  React.useEffect(() => {
    axios.post("http://localhost:8000/api/v1/getUser", {
      userEmail: localStorage.getItem("userEmail")
    }).then((res) => {
      dispatch(renderDashboardData(res.data.data.profile));
    }).catch((err) => {
      toast.error(err.response.data.msg);
    })
  }, [])



  //setting pie chart data
  React.useEffect(() => {
    if (dashboardData.userPortfolio !== undefined) {
        let stocks = dashboardData.userPortfolio[0].userStocks;
        const pieElements = [
          ["Stock Name", "Value"]
        ]
        const stockElements = stocks.map((element, index) => {
          pieElements.push([element.stockName, element.stockTotalValue])
          return (
            <div key={index} style={{border:'1px solid black'}}>
              <p>Name : {element.stockName}</p>
              <p>Purchase price : {element.stockPurchaseValue}</p>
              <p> Quantity : {element.stockQuantity}</p>
              <p>total value : {element.stockTotalValue}</p>
              <p>ID is : {element.stockId}</p>
              <button onClick={()=>{window.location.href=`/sell?stockId=${element.stockId}&stockName=${element.stockName}&stockPurchasePrice=${element.stockPurchaseValue}&quantity=${element.stockQuantity}`}} value={element.stockId}  >Sell This Stock</button>
            </div>
          )
        })
        setStockData(stockElements);
        setPieData(pieElements)
    }
  }, [dashboardData])

  return (
    <>
      <div className='d-flex'>
        <div>NAME </div>
        <div>PROFILE</div>
      </div>
      <div >LOGOUT</div>
      <button onClick={()=>{window.location.href="/buy"}}>Buy Stock</button>
      <div></div>
      <div>CURRENT Portfolio</div>
      <div>PROFIT LOSS CHART, pie charts(total number buyed till now, total spent, total gain, proftolio current money)  </div>
      <div>Buy more stocks </div>
      <div>Sell stocks</div>
      <div>purchase R Money</div>
      <div>
        <Chart
          chartType="PieChart"
          data={pieData}
          options={{
            title: "My stocks",
            is3D: true,
          }}
          width={"100%"}
          height={"300px"}
        />
      </div>
      {stockData && <> <div>{dashboardData.userEmail}</div>
        <div>{dashboardData.userName}</div>
        <div>{dashboardData.userPortfolio[0].userBalance}</div>
        <div>{dashboardData.userPortfolio[0].userSpent}</div>
        <div>{dashboardData.userPortfolio[0].userProfit}</div>
        <div>{dashboardData.userEmail}</div>
        <div>{stockData}</div>
      </>}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default Dashboard