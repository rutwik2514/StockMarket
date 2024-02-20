import axios from 'axios';
import React from 'react'
import { useSearchParams } from "react-router-dom";
import { Chart } from "react-google-charts";
function StudyStock() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [stockSymbol,setStockSymbol]=React.useState();
    const [candleStickData,setcandleStickDate]=React.useState(false);
    const [lineChartDate,setLineChartDate]=React.useState(false);
    var options = {
        legend: "none",
        backgroundColor: "white",
    
        candlestick: {
          fallingColor: { strokeWidth: 0, fill: "red" }, // red
          risingColor: { strokeWidth: 0, fill: "blue" }, // green
        },
        colors: ["#808080"],
        explorer: {
          maxZoomout: 2,
          keepInBounds: true,
        },
      };
    const [show,setShow] = React.useState(false);
    React.useEffect(()=>{
        const symbol = searchParams.get("symbol");
        setStockSymbol(symbol);
    },[])

    React.useEffect(()=>{
        if(candleStickData){
            setShow(true);
        }
    },[candleStickData])

    async function handleClick(e){
        const date = new Date();
        const todayDate = date.getFullYear() + "-" + `${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()}` + "-" + `${date.getDate() < 10? "0" + date.getDate() : date.getDate()}`;
        date.setMonth(date.getMonth() - e.target.value);
        let startDate = date.getFullYear() + "-" + `${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()}` + "-" + `${date.getDate() < 10? "0" + date.getDate() : date.getDate()}`;
        await axios.get(`https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/day/${startDate}/${todayDate}?adjusted=true&sort=asc&apiKey=O_RJpoMmsoEgzJ7p3_OiNynMXdodj0JS`)
        .then(async(res)=>{
            let tempCandleData = [["TimeStamp", "low", "open", "close", "high"]];
            let tempLineChartData = [["Date", "stockPrice"]]
            await res.data.results.map((element,index)=>{
                var date = new Date(element.t*1000);
                date = date.toLocaleDateString();
                tempCandleData.push([date,element.l,element.o,element.c,element.h])
                tempLineChartData.push([date,element.c]);
            })
            setcandleStickDate(tempCandleData);
            setLineChartDate(tempLineChartData);
        }).catch((err)=>{
            console.log(err);
        })
    }

  return (
    <>
    <button onClick={handleClick} value={3}>3 months anaylis</button>
    <button onClick={handleClick} value={6}>6 months anaylis</button>
    <button onClick={handleClick} value={12}>1 year anaylis</button>
    <button onClick={handleClick} value={24}>2 year anaylis</button>
    {show && <>
        <Chart
                  width={"100%"}
                  height={450}
                  chartType="CandlestickChart"
                  loader={<div>Loading Chart</div>}
                  data={candleStickData}
                  options={options}
                  rootProps={{ "data-testid": "1" }}
                />
                <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={lineChartDate}
    //   options={options}
    />
    </>}


    </>
  )
}

export default StudyStock