import React from "react";

import { InputNumber } from "primereact/inputnumber";

// enter amount to request-- user input
const EnterAmountWBO = ({ data, setData }) => {
  return (
    <div className="grid p-fluid  text center">
      <div className="col-12 md:col-12">
        <div className="p-5">
          <div className="text-center">
            <p className=" pb-3 text-3xl">
              Enter the amount of
              <span className="text-blue-300"> {data.asset.label} </span>to
              request in exchange for bonds
            </p>
            <p className="text-3xl pb-3">
              Asset Decimal: <strong> {data.decimal} </strong>
            </p>
          </div>
          <span className="p-float-label">
            <InputNumber
              id="amount"
              value={data.amount}
              onChange={(e) => setData({ ...data, amount: e.value })}
              showButtons
              mode="decimal"
              min={0}
              max={10000000}
              style={{ height: "5rem", fontSize: "2.0rem" }}
              className="p-2"
            ></InputNumber>
            <label
              style={{ fontSize: "2.0rem" }}
              className="text-3xl"
              htmlFor="amount"
            >
              Amount
            </label>
            <div className="text-center">
              <p className="text-3xl">
                Digital Pound to be requested:<strong> {data.amount} </strong>
              </p>
              <p className="text-3xl">
                Bonds left after request:{" "}
                <strong>{+(data.bonds - data.amount)} </strong>
              </p>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnterAmountWBO;
