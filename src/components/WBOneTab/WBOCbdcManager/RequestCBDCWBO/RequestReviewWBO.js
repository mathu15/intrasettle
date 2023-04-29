import React from "react";

// Review and confirm the CBDC Issuance Request
const RequestReviewWBO = ({ data, setData }) => {
  console.log("data", data);
  return (
    <div className="card">
      <div className="flex-column align-items-center justify-content-center">
        <div className=" align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className="text-center text-3xl pb-3">
            Review and confirm the CBDC Issuance Request
          </p>
        </div>
        <div className="flex-column align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className=" text-center text-3xl font-bold text-blue-200 mr-3 pb-3">
            Bonds to swap:{data.asset.label}
          </p>
          <p className="text-center text-3xl pb-3">
            {data.asset.label} to be equested: {data.amount}
          </p>
          <p className="text-center text-3xl pb-3">
            Issuing Party: {data.issue}
          </p>
        </div>
        <div className="flex-column align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className=" text-center text-3xl font-bold text-blue-200 mr-3 pb-3">
            Bonds left after request: {data.bonds - data.amount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestReviewWBO;
