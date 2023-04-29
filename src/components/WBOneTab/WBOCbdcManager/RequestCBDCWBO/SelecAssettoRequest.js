import React from "react";
import { Dropdown } from "primereact/dropdown";

// page for select asset to request
const SelectAssetRequest = ({ data, setData }) => {
  const dropdownValues = [
    { label: "Digital_Dollar" },
    { label: "Digital_Peso" },
    { label: "Digital_Yen" },
    { label: "Digital_Pound" },
    { label: "Digital_Euro" },
    { label: "Digital_$_Frank" },
  ];
  // const [options] = useState(dropdownValues);
  return (
    <div className="grid p-fluid">
      <div className="col-12 ">
        <div className="p-5">
          <h5 className="text-3xl">
            select an asset to issue member access state for.
          </h5>
          <Dropdown
            value={data.asset}
            onChange={(e) => setData({ ...data, asset: e.target.value })}
            options={dropdownValues}
            optionLabel="label"
            placeholder="Select"
            style={{ fontSize: "2rem", height: "4rem" }}
            className="p-2 text-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectAssetRequest;
