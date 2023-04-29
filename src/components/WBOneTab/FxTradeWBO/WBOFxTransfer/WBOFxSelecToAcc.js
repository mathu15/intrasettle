import React from "react";
import { Dropdown } from "primereact/dropdown";
import "../../../../components/dropdown.css";
// select asset to transfer to another wholesale bank
const WBOFxSelecToAcc = ({ data, setData }) => {
  const dropdownValues = [
    { label: "Operation Account" },
    { label: "Trader Account" },
  ];
  const dropplaceholder = <h3>select</h3>;
  return (
    <div className="grid p-fluid">
      <div className="col-12 text-center">
        <div className="text-center text-xl">
          <p className="text-center text-2xl">Select Account</p>
          <Dropdown
            value={data.toaccount}
            onChange={(e) => setData({ ...data, toaccount: e.target.value })}
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

export default WBOFxSelecToAcc;
