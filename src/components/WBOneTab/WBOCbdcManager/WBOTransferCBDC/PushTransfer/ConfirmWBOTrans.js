import React from "react";

// Review and confirm the request of the CBDC asset
const ConfirmWBOTrans = ({ data, setData }) => {
  console.log("data", data);
  return (
    <div className="card">
      <div className="flex-column align-items-center justify-content-center">
        <div className=" align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className="text-center text-2xl ">
            Review and confirm the transfer of the CBDC asset
          </p>
        </div>
        <div className="flex-column align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className=" text-center text-2xl font-bold text-blue-500 mr-3">
            Asset:{data.asset.label}
          </p>
          <p className="text-center text-2xl">
            Receiving Party:{data.notary.label}
          </p>
          <p className="text-center text-2xl">Amount:{data.amount}</p>
          <p className="text-center text-2xl">
            Remaining after Transfer: {data.total - data.amount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmWBOTrans;
