import React from "react";
import { Dropdown } from "primereact/dropdown";

// page for select asset step to pushtransfer
const SelectWBOTransCBDC = ({ data, setData }) => {
  const dropdownValues = [
    { label: "Digital_Dollar" },
    { label: "Digital_Peso" },
    { label: "Digital_Yen" },
    { label: "Digital_Pound" },
    { label: "Digital_Euro" },
    { label: "Digital_$_Frank" },
  ];

  return (
    <div className="grid p-fluid">
      <div className="col-12 ">
        <div className="card">
          <h5 className="text-center text-3xl">
            select available asset from the vault to transfer.
          </h5>
          <Dropdown
            value={data.asset}
            onChange={(e) => setData({ ...data, asset: e.target.value })}
            options={dropdownValues}
            optionLabel="label"
            placeholder="Select"
            style={{ height: "4rem", fontSize: "2.0rem" }}
            className="p-2 font-bold text-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectWBOTransCBDC;
