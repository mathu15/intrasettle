import React from "react";

// Review and confirm the transfer of the CBDC asset to another wholesale bank
const RevReqWBOCross = ({ data, setData }) => {
  console.log("data", data);
  return (
    <div className="card">
      <div className="flex-column align-items-center justify-content-center">
        <div className=" align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className="text-center text-2xl pb-2">
            Review and confirm the Cross Chain Swap Request
          </p>
        </div>
        <div className="flex-column align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className=" text-center text-2xl font-bold text-blue-200 mr-3">
            Receiving Party:{data.notary.label}
          </p>
          <p className="text-center text-2xl">
            Request amount of {data.asset.label}:{data.amount}
          </p>
          <p className="text-center text-2xl">
            {" "}
            Offering amount of {data.asset2.label}:{data.amount2}
          </p>
          <p className="text-center text-2xl pb-2">
            {data.asset2.label} remaining after Transfer:{" "}
            {data.total - data.amount2}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevReqWBOCross;
