import React from "react";
import { Dropdown } from "primereact/dropdown";

// page for select asset step
const SelectAsset = ({ data, setData, entitybalance, setUpdateasset }) => {
/*
  const dropdownValues = [
{ label: "Digital_BINR" },
{ label: "Cash_BINR" },
{ label: "Digital_USDT" },
{ label: "Cash_INR" },
{ label: "Cash_DINR" },
{ label: "Cash_GBP" },

  ];
*/

  return (
    <div className="grid p-fluid">
      <div className="col-12 text-center">
        <div className="text-center text-xl">
          <p className="text-center text-3xl">
            Select asset for issue.
          </p>
          <Dropdown
            value={data.asset}
            onChange={(e) =>  {

		setData({ ...data, asset: e.target.value });
 		 setUpdateasset( e.target.value );

		 }
  		}
            options={entitybalance}
            optionLabel="label"
            placeholder="Select"
            className="p-2 font-bold text-3xl"
            style={{ height: "4rem", fontSize: "2.0rem" }}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectAsset;
