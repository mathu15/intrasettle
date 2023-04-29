import React from "react";
import { Dropdown } from "primereact/dropdown";

// select the wholesale bank to transfer asset
const SelectParWBOCross = ({ data, setData }) => {
  const dropdownValues = [
    { label: "O=WHOLESALETWO, L=LONDON, CGB" },
    { label: "O=WHOLESALETHREE, L=LONDON, CGB" },
  ];

  return (
    <div className="grid p-fluid">
      <div className="col-12 ">
        <div className="card">
          <h5 className="text-2xl text-center">
            select available participant to request a Cross Chain Swap from.
          </h5>
          <Dropdown
            value={data.notary}
            onChange={(e) => setData({ ...data, notary: e.target.value })}
            options={dropdownValues}
            optionLabel="label"
            placeholder="Select"
            style={{ fontSize: "1.4rem" }}
            className="p-3 m-3"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectParWBOCross;
