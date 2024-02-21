import React from 'react'
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


function SellPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [stockInfo, setStockInfo] = React.useState(false);

    //renders stock current price and data
    async function RenderData() {
        await axios.get(`https://api.polygon.io/v1/open-close/${searchParams.get("stockName")}/2024-02-16?adjusted=true&apiKey=O_RJpoMmsoEgzJ7p3_OiNynMXdodj0JS`)
            .then((res) => {
                setStockInfo(res.data);
            }).catch((err) => {
                if (err.response.data.status == "NOT_FOUND") {
                    toast.error("Invalid stock symbol")
                }
                else {
                    toast.error("MARKET IS CLOSED NOW")
                }
            })
    }

    //sells stock
    async function sellStock(e) {
        e.preventDefault();
        if (stockInfo) {
            await axios.post("http://localhost:8000/api/v1/sellstock", {
                id: searchParams.get("stockId"),
                stockQuantity: e.target.stockQuantity.value,
                email: localStorage.getItem("userEmail"),
                stockPrice: stockInfo.close

            }).then((res) => {
                toast.success(res.data.msg)
                setTimeout(function () {
                    window.location.href = "/dashboard";
                }, 2000);
            }).catch((err) => {
                toast.error(err.response.data.msg)
            })
        }
    }
    React.useEffect(() => {
        RenderData();
    }, [])

    return (
        <>
            {stockInfo && <>
                <p>Current Price is {stockInfo.close}</p>
                <p>symbol is : {stockInfo.symbol}</p>
                <p>Purchase Price was {searchParams.get("stockPurchasePrice")}</p>
                <p>Available Quantity : {searchParams.get("quantity")}</p>
                <form onSubmit={sellStock}>
                    <input name='stockQuantity' placeholder='enter quantity to buy' />
                    <button onClick={(e) => { window.location.href = `/study?symbol=${stockInfo.symbol}` }}>Study this stock</button>
                    <button type="submit" >Sell this stock</button>
                </form>



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

export default SellPage