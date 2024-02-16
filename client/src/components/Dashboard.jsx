import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { renderDashboardData } from '../actions/dashboard';
import axios from "axios"
function Dashboard() {
  const dashboardData = useSelector((state) => state.dashboardData)
  const dispatch = useDispatch();

  
  // getting all user data as soon as dashboard page is rendered
  React.useEffect(() => {
    axios.post("http://localhost:8000/api/v1/getUser",{
      userEmail : "rutwik2514@gmail.com3"
     }).then((res) =>{;
      dispatch(renderDashboardData(res.data.data.profile));
     }).catch((err)=>{
      window.alert(err.response.data.msg);
     })
  }, [])

  return (
    <>
      <div className='d-flex'>
        <div>NAME </div>
        <div>PROFILE</div>
        <div>LOGOUT</div>
      </div>
      <div></div>
      <div>CURRENT Portfolio</div>
      <div>PROFIT LOSS CHART, pie charts(total number buyed till now, total spent, total gain, proftolio current money)  </div>
      <div>Buy more stocks </div>
      <div>Sell stocks</div>
      <div>purchase R Money</div>
      <div>{dashboardData.userEmail}</div>
    </>
  )
}

export default Dashboard