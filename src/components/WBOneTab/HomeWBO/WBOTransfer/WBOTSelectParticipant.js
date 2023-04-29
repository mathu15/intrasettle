import React from "react";
import { Dropdown } from "primereact/dropdown";

// select the wholesale bank to transfer asset
const WBOTSelectParticipant = ({ data, setData, entityaccounts , foreignentityaccounts }) => {

  return (
    <div className="grid p-fluid">
      <div className="col-12 text-center">
        <div className="text-center text-xl">
          <p className="text-center text-2xl">
            Select available participant to transfer.
          </p>
          <Dropdown
            value={data.participant}
            onChange={(e) => setData({ ...data, participant: e.target.value })}
            options={entityaccounts}
            optionLabel="organization"
            placeholder="Select"
            style={{ fontSize: "1.4rem" }}
            className="p-2"
          />
        </div>


      </div>
    </div>
  );
};

export default WBOTSelectParticipant;
