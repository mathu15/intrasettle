import React from "react";
import { Dropdown } from "primereact/dropdown";

// select the particiapnt which has requested for the asset
const MASelectParticipant = ({ data, setData }) => {
  const dropdownValues = [
    { name: "WholesaleBankONE, L=London, C=GB" },
    { name: "WholesaleBankTWO, L=London, C=GB" },
    { name: "WholesaleBankTHREE, L=London, C=GB" },
  ];

  return (
    <div className="grid p-fluid">
      <div className="col-12 ">
        <div className="p-5">
          <h5 className="text-2xl">
            select participant on the Corda network to issue to.
          </h5>
          <Dropdown
            value={data.participant}
            onChange={(e) => setData({ ...data, participant: e.value })}
            options={dropdownValues}
            optionLabel="name"
            placeholder="Select"
            style={{ fontSize: "1.4rem" }}
            className="p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default MASelectParticipant;
