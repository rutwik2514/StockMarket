import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { renderDashboardData } from '../actions/dashboard';
import axios from "axios"
import { Chart } from "react-google-charts";
import { ToastContainer, toast } from 'react-toastify';

function Dashboard() {
  const dashboardData = useSelector((state) => state.dashboardData)
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const [stockData, setStockData] = React.useState();
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



  React.useEffect(() => {
    if (dashboardData.userPortfolio !== undefined) {
      setShow(true);

      //setting stock data and pie chart data
      if (dashboardData.userPortfolio[0].userStocks.length > 0) {
        let stocks = dashboardData.userPortfolio[0].userStocks;
        const pieElements = [
          ["Stock Name", "Value"]
        ]
        const stockElements = stocks.map((element, index) => {
          pieElements.push([element.stockName, element.stockTotalValue])
          return (
            <div>
              <p>{element.stockName}</p>
              <p>{element.stockPurchasePrice}</p>
              <p>{element.stockQuantity}</p>
              <p>{element.stockTotalValue}</p>
            </div>
          )
        })
        setStockData(stockElements);
        setPieData(pieElements)
      }
    }
  }, [dashboardData])


  return (
    <>
      <div className='d-flex'>
        <div>NAME </div>
        <div>PROFILE</div>
      </div>
      <div >LOGOUT</div>
      <button>Logout</button>
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
      {show && <> <div>{dashboardData.userEmail}</div>
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