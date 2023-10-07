import React, { useState } from "react";

const Input = (props) => {
  const { onAmountChange, amount, warning } = props;
  return (
    <div className=" h-20">
      <label
        htmlFor="amount"
        className="block text-sm font-medium leading-6  text-textSecondry text-left"
      >
        Amount
      </label>
      <div className="relative mt-0 rounded-md shadow-sm">
        <input
          type="number"
          name="amount"
          id="amount"
          className="block w-full rounded-md border-0 py-1.5 pl-7  pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="0.00"
          value={amount}
          onChange={onAmountChange}
        />
      </div>
      {warning && <p className=" text-lef text-yellow-300 text-xs mt-1" style={{ marginLeft:-5 }}> {warning}</p>}
    </div>
  );
};

export default Input;
