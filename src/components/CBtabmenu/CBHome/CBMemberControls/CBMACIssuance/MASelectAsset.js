import React from "react";
import { Dropdown } from "primereact/dropdown";

//select the requested asset to be issued
const MASelectAsset = ({ data, setData }) => {
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
          <h5 className="text-2xl ">
            select an asset to issue member access state for.
          </h5>
          <Dropdown
            value={data.assetvalue}
            onChange={(e) => setData({ ...data, assetvalue: e.value })}
            options={dropdownValues}
            optionLabel="label"
            placeholder="Select"
            style={{ fontSize: "1.4rem" }}
            className="p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default MASelectAsset;
