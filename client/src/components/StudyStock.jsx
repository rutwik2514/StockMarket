import axios from 'axios';
import React from 'react'
import { useSearchParams } from "react-router-dom";
import { Chart } from "react-google-charts";
function StudyStock() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [candleStickData,setcandleStickDate]=React.useState(false);
    const [lineChartData,setLineChartDate]=React.useState(false);
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



    //setting graph data

    async function handleClick(e){
        const date = new Date();
        //todays date in format YYYY-MM-DD
        const todayDate = date.getFullYear() + "-" + `${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()}` + "-" + `${date.getDate() < 10? "0" + date.getDate() : date.getDate()}`;

        //input date set in format YYYY-MM-DD
        date.setMonth(date.getMonth() - e.target.value);
        let startDate = date.getFullYear() + "-" + `${date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()}` + "-" + `${date.getDate() < 10? "0" + date.getDate() : date.getDate()}`;

        //getting data from startDate to todayDate
        await axios.get(`https://api.polygon.io/v2/aggs/ticker/${searchParams.get("symbol")}/range/1/day/${startDate}/${todayDate}?adjusted=true&sort=asc&apiKey=O_RJpoMmsoEgzJ7p3_OiNynMXdodj0JS`)
        .then(async(res)=>{
            let tempCandleData = [["TimeStamp", "low", "open", "close", "high"]];
            let tempLineChartData = [["Date", "stockPrice"]]
            await res.data.results.map((element,index)=>{
                var date = new Date(element.t);
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
    {candleStickData && <>
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
      data={lineChartData}
    //   options={options}
    />
    </>}


    </>
  )
}

export default StudyStock