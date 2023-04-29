import React from "react";
import { Dropdown } from "primereact/dropdown";

// select the wholesale bank to transfer asset
const WBOTSelectParticipantforeign = ({ data, setData, entityaccounts , foreignentityaccounts }) => {

  return (
    <div className="grid p-fluid">
      <div className="col-12 text-center">




	  <div className="text-center text-xl">
          <p className="text-center text-2xl">
            Select available foreign participants to transfer.
          </p>
          <Dropdown
            value={data.participant}
            onChange={(e) => setData({ ...data, participant: e.target.value })}
            options={foreignentityaccounts}
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

export default WBOTSelectParticipantforeign;
