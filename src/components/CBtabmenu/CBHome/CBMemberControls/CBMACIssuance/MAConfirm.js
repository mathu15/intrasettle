import React from "react";

// review and confirm (display) the accepted asset for issuance to wholesale bank
const MACConfirm = ({ data, setData }) => {
  console.log("data", data);
  return (
    <div className="flex-column align-items-center justify-content-center">
      <div className=" align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
        <p className="text-center text-2xl p-3">
          Confirm Member Access state issuance details
        </p>
      </div>
      <div className="flex-column align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
        <p className=" text-center text-2xl font-bold text-blue-200 mr-3 p-3">
          Assets:{data.assetvalue.label}
        </p>
        <p className="text-center text-2xl p-3">
          participant:{data.participant.name}
        </p>
      </div>
    </div>
  );
};

export default MACConfirm;
