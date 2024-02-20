import React from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Buypage() {
    const [stockName,setStockName]=React.useState();
    const [stockInfo,setStockInfo] = React.useState(false);
    const [show,setShow] = React.useState();
    const handleClick = async() =>{
        await axios.get(`https://api.polygon.io/v1/open-close/${stockName}/2024-02-16?adjusted=true&apiKey=O_RJpoMmsoEgzJ7p3_OiNynMXdodj0JS`)
        .then((res)=>{
            console.log(res.data);
            if(res.data.status != "OK"){
                if(res.data.status == "NOT_FOUND"){
                    toast.error("Invalid stock symbol")
                }
                else{
                    toast.error("MARKET IS CLOSED NOW")
                }
            }
            else{
                setStockInfo(res.data);
            }
        }).catch((err)=>{
            console.log(err);
            if(err.response.data.status == "NOT_FOUND"){
                toast.error("Invalid stock symbol")
            }
            else{
                toast.error("MARKET IS CLOSED NOW")
            }
            setShow(false);
        })
    }

    React.useEffect(()=>{
        if(stockInfo){
            setShow(true);
        }

    },[stockInfo])
    
  return (
    <>
        <input placeholder='enter stock name to buy' onChange={(e)=>setStockName(e.target.value)} />
        <button onClick={handleClick}>Find</button>
        {show && <>
        <p>Price is {stockInfo.close}</p>
        <p>symbol is : {stockInfo.symbol}</p>
        <button onClick={(e)=>{window.location.href=`/study?symbol=${stockInfo.symbol}`}}>Study this stock</button>

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

export default Buypage