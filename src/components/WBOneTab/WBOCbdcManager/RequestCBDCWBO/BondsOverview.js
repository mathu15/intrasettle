import React from "react";

// To display the Total Bonds in Vault
const BondsOverview = ({ data, setData }) => {
  console.log("data", data);
  return (
    <div className="p-5">
      <div className="flex-column align-items-center justify-content-center">
        <div className=" align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className="text-center text-3xl pb-3">Total Bonds in Vault</p>
        </div>
        <div className="flex-column align-items-center border-bottom-1 surface-border surface-overlay w-full mt-5">
          <p className=" text-center text-3xl font-bold text-blue-200 mr-3 pb-3">
            Bonds owned:{data.bonds}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BondsOverview;
