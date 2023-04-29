import React from "react";
import { Dropdown } from "primereact/dropdown";

// select assets to transfer to swap with
const SelectAssWBOCross = ({ data, setData }) => {
  const dropdownValues = [
    { label: "Digital_Dollar" },
    { label: "Digital_Peso" },
    { label: "Digital_Yen" },
    { label: "Digital_Pound" },
    { label: "Digital_Euro" },
    { label: "Digital_$_Frank" },
  ];
  const dropdownValues2 = [
    { label: "Digital_Dollar" },
    { label: "Digital_Peso" },
    { label: "Digital_Yen" },
    { label: "Digital_Pound" },
    { label: "Digital_Euro" },
    { label: "Digital_$_Frank" },
  ];

  return (
    <div className="grid p-fluid">
      <div className="col-12 ">
        <div className="card">
          <h5 className="text-center pb-2 text-2xl">
            Select CBDC Asset to Request.
          </h5>
          <h5 className="text-center border-bottom-3  surface-border pb-4 text-2xl">
            (Both assets must have different signing notaries)
          </h5>
          <Dropdown
            value={data.asset}
            onChange={(e) => setData({ ...data, asset: e.target.value })}
            options={dropdownValues}
            optionLabel="label"
            placeholder="CBDC Asset to Request"
            className="mt-4 p-2"
          />
          <h5 className="text-center  pb-2 text-2xl">
            Asset Notaries:{data.asset.label}
          </h5>
          <h5 className="text-center border-bottom-3  surface-border pb-4 text-2xl">
            Select CBDC Asset to Offer.
          </h5>
          <Dropdown
            value={data.asset2}
            onChange={(e) => {
              setData({ ...data, asset2: e.target.value });
            }}
            options={dropdownValues2}
            optionLabel="label"
            placeholder="CBDC Asset to Offer"
            className="mt-4 p-2"
          />
          <div className="mt-3 mb-2 text-center text-2xl">
            Asset Notaries:{data.asset2.label}
          </div>
          <div className="flex-column  align-items-center border-1 surface-border ">
            <p className=" text-xl text-center border-botom-1 text-2xl p-3">
              Total amount in vault:{data.total}
            </p>
            <p className=" text-xl text-center text-2xl pb-3">
              Available to transact:{data.remaining}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectAssWBOCross;
