import React from "react";
import { InputNumber } from "primereact/inputnumber";

//enter the maximum transaction value to be transfered
const AssetAmtWBOCross = ({ data, setData }) => {
  console.log("data", data);
  return (
    <div className="grid p-fluid">
      <div className="col-12">
        <div className="card">
          <p className=" text-center text-2xl  text-blue-200 mr-3">
            Enter the amount of {data.asset.label} to request.
          </p>
          <p className=" text-center text-2xl  text-blue-200 mr-3">
            Asset decimal: {data.decimal}
          </p>
          <InputNumber
            id="amount"
            value={data.amount}
            onChange={(e) => setData({ ...data, amount: e.value })}
            showButtons
            mode="decimal"
          ></InputNumber>
        </div>
        <div className="card">
          <p className=" text-center text-2xl text-blue-200 mr-3">
            Enter the amount of {data.asset2.label} to offer.
          </p>
          <p className=" text-center text-2xl  text-blue-200 mr-3">
            Asset decimal: {data.decimal}
          </p>
          <InputNumber
            id="amount"
            value={data.amount2}
            onChange={(e) => setData({ ...data, amount2: e.value })}
            showButtons
            mode="decimal"
          ></InputNumber>
        </div>
        <div className="flex-column  align-items-center border-1 surface-border ">
          <p className=" text-2xl text-center border-botom-1 pt-3">
            Total amount in vault:{data.total}
          </p>
          <p className=" text-2xl text-center">
            Available to transact:{data.remaining}
          </p>
          <p className=" text-2xl text-center pb-3">
            Remaining after transaction:{data.total - data.amount2}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssetAmtWBOCross;
