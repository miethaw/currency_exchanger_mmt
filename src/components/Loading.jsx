import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color }) => (
  <div className="flex justify-center items-center" style={{ 
    minHeight : 120
     }}>
    <ReactLoading type={type} color={color} height={"10%"} width={"10%"} />
  </div>
);

export default Loading;
