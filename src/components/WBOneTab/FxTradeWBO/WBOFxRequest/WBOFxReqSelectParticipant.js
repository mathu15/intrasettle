import React from "react";
import { Dropdown } from "primereact/dropdown";
import "../../../../components/dropdown.css";
// select the wholesale bank to transfer asset
const WBOFxSelectParticipant = ({ data, setData, entityaccounts }) => {
  const dropdownValues = [
    { label: "WHOLESALEBANKTWO,CAC-SUB901-0002" },
    { label: "WHOLESALEBANKTHREE,CAC-SUB901-0003" },
    { label: "WHOLESALEBANKFOUR,CAC-SUB901-0004" },
  ];
  const dropplaceholder = <h3>select</h3>;
  return (
    <div className="grid p-fluid">
      <div className="col-12 text-center">
        <div className="text-center text-xl">
          <p className="text-center text-2xl">
            select available participant to transfer.
          </p>
          <Dropdown
            value={data.notary}
            onChange={(e) => setData({ ...data, notary: e.target.value })}
            options={entityaccounts}
            optionLabel="label"
            placeholder={dropplaceholder}
            style={{ fontSize: "1.4rem" }}
            className="p-2 p-dropdown-item"
          />
        </div>
      </div>
    </div>
  );
};

export default WBOFxSelectParticipant;
