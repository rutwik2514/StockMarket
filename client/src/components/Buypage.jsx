import React from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { isLoadingTrue, isLoadingFalse } from '../redux/actions/actions';
import waterMark from "../assets/lottie_gif.gif"


function Buypage() {
    const [stockInfo, setStockInfo] = React.useState(false);
    const isLoading = useSelector((state) => state.isLoading);
    const dispatch = useDispatch();


    //getting stock information through api
    const handleClick = async (e) => {
        dispatch(isLoadingTrue());
        e.preventDefault();
        await axios.get(`https://api.polygon.io/v1/open-close/${e.target.stockName.value}/2024-02-16?adjusted=true&apiKey=O_RJpoMmsoEgzJ7p3_OiNynMXdodj0JS`)
            .then((res) => {
                setStockInfo(res.data);
                dispatch(isLoadingFalse());
            }).catch((err) => {
                if (err.response.data.status == "NOT_FOUND") {
                    toast.error("Invalid stock symbol")
                }
                else {
                    toast.error("MARKET IS CLOSED NOW")
                }
                dispatch(isLoadingFalse());
            })
    }

    //buying stock
    const handleClickBuy = async (e) => {
        dispatch(isLoadingTrue());
        e.preventDefault();
        axios.post("http://localhost:8000/api/v1/buystock", {
            stockName: stockInfo.symbol,
            stockPrice: stockInfo.close,
            stockQuantity: e.target.stockQuantity.value,
            email: localStorage.getItem("userEmail")
        }).then((res) => {
            toast.success("Stock Purchase Successful")
            dispatch(isLoadingFalse());
        }).catch((err) => {
            toast.error(err.response.data.msg)
            dispatch(isLoadingFalse());
        })


    }

    // setting isLoading false initial after page is rendered
    React.useEffect(() => {
        dispatch(isLoadingFalse());
    }, [])


    return (
        <>
            <form onSubmit={handleClick}>
                <input placeholder='enter stock name to buy' name='stockName' />
                <button type='submit'>Find</button>
            </form>
            {isLoading && <img src={waterMark} style={{ height: '100vh', zIndex: '1', opacity: '0.2', position: 'absolute' }} alt="watermark" />}

            {stockInfo && <form onSubmit={handleClickBuy}>
                <p>Price is {stockInfo.close}</p>
                <p>symbol is : {stockInfo.symbol}</p>
                <input name="stockQuantity" placeholder='enter quantity to buy' />
                <button onClick={(e) => { window.location.href = `/study?symbol=${stockInfo.symbol}` }}>Study this stock</button>
                <button type='submit' >Buy this stock</button>
            </form>}
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

export default Buypage