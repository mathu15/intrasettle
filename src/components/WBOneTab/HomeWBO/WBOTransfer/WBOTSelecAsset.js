import React from "react";
import { Dropdown } from "primereact/dropdown";

// select asset to transfer to another wholesale bank
const WBOTSelectAsset = ({ data, setData , subscriberbalance, setUpdateasset }) => {
/*
  const dropdownValues = [
    { label: "Digital_Dollar" },
    { label: "Digital_Peso" },
    { label: "Digital_Yen" },
    { label: "Digital_Pound" },
    { label: "Digital_Euro" },
    { label: "Digital_$_Frank" },
  ];
*/

  return (
    <div className="grid p-fluid">
      <div className="col-12 text-center">
        <div className="text-center text-xl">
          <p className="text-center text-2xl">
            Select available asset for transfer.
          </p>
          <Dropdown
            value={data.asset}
            onChange={(e) => { 
			setData({ ...data, asset: e.target.value });
		setUpdateasset( e.target.value );
		  }
                }
            options={subscriberbalance}
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

export default WBOTSelectAsset;
