import React, { useEffect, useState } from 'react'
import Sidebar_responsive from './Sidebar_responsive';

function Navbar() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const isWideScreen = windowWidth > 1000;
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
  return (
    <>
    {isWideScreen ? (
        <>
          <nav className="navbar">
            <div className="logo" style={{marginLeft:"100px"}}> PaperMarket</div>
            <ul className="nav-links" style={{marginRight:"50px"}}>
              <li><a href="/buy">Buy</a></li>
              <li><a href="/sell">Sell</a></li>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/analysis">Analysis</a></li>
              <li><a href="/sign-up" className="signup-btn">Sign up</a></li>
            </ul>
          </nav>
        </>
      ) : (
        <Sidebar_responsive />
      )}
      </>
  )
}

export default Navbar