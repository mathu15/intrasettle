import React from "react";
import { InputNumber } from "primereact/inputnumber";

// page for enter amount to pull transfer
const WBOPullEnterAmount = ({ data, setData }) => {
  console.log("data", data);
  return (
    <div className="card">
      <div className="flex-column align-items-center justify-content-center">
        <div className=" align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className="text-center text-3xl ">Enter amount to transfer.</p>
        </div>
        <div className="flex-column align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className=" text-center text-3xl font-bold text-blue-500 mr-3">
            Asset decimal:{data.decimal}
          </p>
          <p className="text-center text-3xl">
            Total amount in vault:{data.total}
          </p>
          <p className="text-center text-3xl">
            Remaininig after transfer:{data.total - data.amount}
          </p>
          <p className="text-center text-3xl">compliance controls</p>
        </div>
        <div className="flex-column align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className=" text-center text-3xl font-bold text-blue-500 mr-3">
            Maximum transaction value with this asset {data.maxvalue}
          </p>
          <InputNumber
            id="amount"
            value={data.amount}
            onChange={(e) => setData({ ...data, amount: e.value })}
            showButtons
            mode="decimal"
            min={0}
            max={10000000}
            style={{ height: "4rem", fontSize: "2.0rem" }}
          ></InputNumber>
          <label htmlFor="amount">Amount</label>
        </div>
      </div>
    </div>
  );
};

export default WBOPullEnterAmount;
