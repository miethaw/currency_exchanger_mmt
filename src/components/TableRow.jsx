import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function TableRow({ data, index, name, date, from, to }) {
  useEffect(() => {
    AOS.init();
  }, []);


  return (
    <div
      data-aos="zoom-in"
      className="bg-primary/[0.6] backdrop-blur-md items-center border text-white border-cyan-500 rounded-lg"
    >
      <div
        className="flex items-center py-2 border-secondry"
        style={{ borderBottomWidth: 1 }}
      >
        <div className="w-1/2">
          <p className="text-sm text-textSecondry">Date</p>
        </div>
        <div className="w-1/2 ">
          <p className="text-sm text-textSecondry">From</p>
        </div>
        <div className="w-1/2 ">
          <p className="text-sm text-textSecondry">To</p>
        </div>
      </div>
      <div className="flex items-center py-2">
        <div className="w-1/2">
          <p className="text-md  text-textPrimary h-10"> {date}</p>
        </div>
        <div className="w-1/2">
          <p className="text-md  text-textPrimary h-10">1 {from}</p>
        </div>
        <div className="w-1/2">
          <p className="text-md  text-textPrimary h-10">
            {data?.[name]?.toFixed(4)} {to}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TableRow;
