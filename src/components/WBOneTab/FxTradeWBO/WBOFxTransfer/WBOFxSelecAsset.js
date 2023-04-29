import React from "react";
import { Dropdown } from "primereact/dropdown";
import "../../../../components/dropdown.css";
// select asset to transfer to another wholesale bank
const WBOFxSelecAsset = ({ data, setData, assets, setAsset }) => {
  const dropdownValues =  assets ;
	/*
	[
    { label: "Cash_BINR,ASSET-BND-0001" },
    { label: "Digital_BINR,ASSET-BND-0002" },
    { label: "Digital_USDT,ASSET-BND-0003" },
    { label: "Cash_DINR,ASSET-BND-0004" },
    { label: "Cash_GBP,ASSET-BND-0005" },
    { label: "Cash_INR,ASSET-BND-0006" },
  ];
  */
  const dropplaceholder = <h3>select</h3>;
  return (
    <div className="grid p-fluid">
      <div className="col-12 text-center">
        <div className="text-center text-xl">
          <p className="text-center text-2xl">
            select available asset from the vault to transfer.
          </p>
          <Dropdown
            value={data.assetid}
            onChange={(e) => { setData({ ...data, assetid: e.target.value }); setAsset(e.target.value);} }
            options={dropdownValues}
            optionLabel="label"
            placeholder={dropplaceholder}
            className="p-2 font-bold text-3xl p-dropdown-item"
            style={{ height: "4rem", fontSize: "2.0rem" }}
          />
        </div>
      </div>
    </div>
  );
};

export default WBOFxSelecAsset;
