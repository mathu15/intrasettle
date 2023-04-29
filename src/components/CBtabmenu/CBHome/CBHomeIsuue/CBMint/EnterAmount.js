import React, { useState, useEffect } from "react";
import { InputNumber } from "primereact/inputnumber";
import { Satspertoken } from "../../../../App/Satspertoken";

function decfraction(sat) {
  if (sat == 100) return 2;
  if (sat == 10) return 1;
  if (sat == 1) return 0;
}

// page for enter amount step
const EnterAmount = ({ data, setData }) => {
  // console.log("data", data);
  const [fraction, setFraction] = useState(1);
  const satspertoken = new Satspertoken();

  useEffect(() => {
    setFraction(satspertoken.decfraction(data.satspertoken));
  }, [data.satspertoken]);

  return (
    <div className="text-center text-2xl">
      <div className="flex-column align-items-center justify-content-center">
        <div className="flex-column align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className=" text-center text-3xl font-bold text-blue-300 mr-3">
            Maximum transaction value with this asset: {data.maxvalue}
          </p>
          <InputNumber
            id="amount"
            value={data.amount}
            maxFractionDigits={fraction}
            minFractionDigits={fraction}
            onChange={(e) => setData({ ...data, amount: e.value })}
            showButtons
            mode="decimal"
            min={0}
            max={10000000}
            style={{ height: "4rem", fontSize: "2.0rem" }}
          ></InputNumber>
          <label style={{ fontSize: "2.0rem" }} htmlFor="amount">
            Amount
          </label>
        </div>
      </div>
    </div>
  );
};

export default EnterAmount;
