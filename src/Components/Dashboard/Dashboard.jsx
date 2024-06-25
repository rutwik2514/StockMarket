import React, { useEffect, useState } from 'react'
import Navbar from '../../Utilis/Navbar/Navbar';

function Dashboard() {

  return (
    <>
      <Navbar />
      <section>
        <div className='row' style={{ backgroundColor: "orange", height: "10vh", marginLeft: "0px" }}>

        </div>
        <div className='row' style={{ minHeight: "20vh", marginLeft: "0px" }}>
          <div className='col-md-3' style={{ backgroundColor: "pink", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
            <div className='box' style={{ height: "12vh", width: "80%", backgroundColor: "purple" }}>
              hi
            </div>
          </div>
          <div className='col-md-3' style={{ backgroundColor: "pink", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
            <div className='box' style={{ height: "12vh", width: "80%", backgroundColor: "purple" }}>

            </div>
          </div>
          <div className='col-md-3' style={{ backgroundColor: "pink", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
            <div className='box' style={{ height: "12vh", width: "80%", backgroundColor: "purple" }}>

            </div>
          </div>
          <div className='col-md-3' style={{ backgroundColor: "pink", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
            <div className='box' style={{ height: "12vh", width: "80%", backgroundColor: "purple" }}>

            </div>
          </div>
        </div>
        <div className='row' style={{ minHeight: "50vh", backgroundColor: "yellow" }}>
          <div className="col-md-6" style={{ backgroundColor: "yellow" }}>
            <div>
              <table style={{ width: "100%", tableLayout: "fixed" }}>
                <thead >
                  <tr>
                    <th style={{ width: "16.66%", backgroundColor: "yellow" }}>
                      <div style={{ backgroundColor: "yellow", textAlign: "center" }}>
                        Sr.No
                      </div>
                    </th>
                    <th style={{ width: "16.66%", backgroundColor: "yellow" }}>
                      <div style={{ backgroundColor: "yellow", textAlign: "center" }}>
                        Stock Name
                      </div>
                    </th>
                    <th style={{ width: "16.66%", backgroundColor: "yellow" }}>
                      <div style={{ backgroundColor: "yellow", textAlign: "center" }}>
                        Date
                      </div>
                    </th>
                    <th style={{ width: "16.66%", backgroundColor: "yellow" }}>
                      <div style={{ backgroundColor: "yellow", textAlign: "center" }}>
                        Quantity
                      </div>
                    </th>
                    <th style={{ width: "16.66%", backgroundColor: "yellow" }}>
                      <div style={{ backgroundColor: "yellow", textAlign: "center" }}>
                        Price
                      </div>
                    </th>
                    <th style={{ width: "16.66%", backgroundColor: "yellow" }}>
                      <div style={{ backgroundColor: "yellow", textAlign: "center" }}>
                        Type
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          <div className="col-md-6" style={{ backgroundColor: "green" }}>
            <div>
              <table style={{ width: "100%", tableLayout: "fixed" }}>
                <thead >
                  <tr>
                    <th style={{ width: "16.66%", backgroundColor: "green" }}>
                      <div style={{ backgroundColor: "green", textAlign: "center" }}>
                        Sr.No
                      </div>
                    </th>
                    <th style={{ width: "16.66%", backgroundColor: "green" }}>
                      <div style={{ backgroundColor: "green", textAlign: "center" }}>
                        Stock Name
                      </div>
                    </th>
                    <th style={{ width: "16.66%", backgroundColor: "green" }}>
                      <div style={{ backgroundColor: "green", textAlign: "center" }}>
                        Date
                      </div>
                    </th>
                    <th style={{ width: "16.66%", backgroundColor: "green" }}>
                      <div style={{ backgroundColor: "green", textAlign: "center" }}>
                        Quantity
                      </div>
                    </th>
                    <th style={{ width: "16.66%", backgroundColor: "green" }}>
                      <div style={{ backgroundColor: "green", textAlign: "center" }}>
                        Price
                      </div>
                    </th>
                    <th style={{ width: "16.66%", backgroundColor: "green" }}>
                      <div style={{ backgroundColor: "green", textAlign: "center" }}>
                        Type
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard