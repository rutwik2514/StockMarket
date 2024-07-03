import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmitProfile = () => {
    navigate("/dash-board");
  };

  const renderMenuItems = () => (
    <>
      <div className="cursor-pointer hover:underline bg-[#C3ACD0] font-bold text-[#52057B] px-4 py-2 rounded-md">
        Buy
      </div>
      <div className="cursor-pointer hover:underline bg-[#C3ACD0] font-bold text-[#52057B] px-4 py-2 rounded-md">
        Sell
      </div>
      <div
        className="cursor-pointer hover:underline bg-[#C3ACD0] font-bold text-[#52057B] px-4 py-2 rounded-md"
        onClick={handleSubmitProfile}
      >
        Profile
      </div>
      <div className="cursor-pointer hover:underline bg-[#C3ACD0] font-bold text-[#52057B] px-4 py-2 rounded-md">
        Logout
      </div>
    </>
  );

  return (
    <div>
      {isMobile ? (
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-md p-4 flex flex-col">
          <div className="text-4xl mb-6 font-bold text-[#52057B]">
            StockInv
          </div>
          <div className="flex flex-col gap-4">
            {renderMenuItems()}
          </div>
        </div>
      ) : (
        <div className=" p-4 bg-[#FFFBF5] flex justify-between items-center">
          <div className="text-6xl ml-4 font-bold text-[#52057B]">
            StockInv
          </div>
          <div className="flex gap-4 items-center">
            {renderMenuItems()}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;