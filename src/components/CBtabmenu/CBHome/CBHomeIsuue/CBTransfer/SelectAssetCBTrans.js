import React from "react";
import { Dropdown } from "primereact/dropdown";

// page for select asset step
const SelectAssetCBTrans = ({ data, setData  , centralbalance, setUpdateasset }) => {
/*
  const dropdownValues = [
    { label: "Digital_INR" },
    { label: "Digital_GBP" },
    { label: "Digital_USD" },
    { label: "Digital_YEN" },
    { label: "Digital_EURO" },
    { label: "Digital_$_FRANK" },
  ];
*/
  return (
    <div className="grid p-fluid">
      <div className="col-12 text-center">
        <div className="text-center text-xl">
          <p className="text-center text-3xl">
            select available asset for transfer.
          </p>
          <Dropdown
            value={data.asset}
            onChange={(e) => {
			setData({ ...data, asset: e.target.value });
		 setUpdateasset( e.target.value );

			}
 		}
            options={centralbalance}
            optionLabel="label"
            placeholder="Select"
            style={{ height: "4rem", fontSize: "2.0rem" }}
            className="p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectAssetCBTrans;
