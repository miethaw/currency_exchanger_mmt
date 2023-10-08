import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import TableRow from "./TableRow";

function HistoryTable(props) {
  const { currencyFrom, currencyTo,historyData } = props;
  

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className=" mt-10 justify-center ">
        {historyData && 
          Object.keys(historyData)?.map((ddata, index) => {
            return (
              <div className="py-1 " key={index}>
                <TableRow
                  data={historyData?.[ddata]}
                  date={ddata}
                  index={index}
                  name={currencyFrom.concat(currencyTo)}
                  from={currencyFrom}
                  to={currencyTo}
                />
              </div>
            );
          })}
    </div>
  );
}

export default HistoryTable;
