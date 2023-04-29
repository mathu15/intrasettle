import React from "react";

// Review and confirm the transfer of the CBDC asset to another wholesale bank
const WBOTConfirmTransfer = ({ data, setData }) => {
  console.log("data", data);
  return (
    <div className="card">
      <div className="flex-column align-items-center justify-content-center">
        <div className=" align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className="text-center text-3xl ">
            Review and confirm the transfer of the CBDC asset
          </p>
        </div>
        <div className="flex-column align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className=" text-center text-3xl font-bold text-blue-500 mr-3">
            Asset:{data.asset.label}
          </p>
          <p className="text-center text-3xl">
            Receiving Party:{data.participant.label}
          </p>
          <p className="text-center text-3xl">Amount:{data.amount}</p>
          <p className="text-center text-3xl">
            Remaining after Transfer: {(data.maxvalue - data.amount).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WBOTConfirmTransfer;
