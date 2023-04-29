import React from "react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { RadioButton } from "primereact/radiobutton";

export const CBName = ({ data, setData }) => {
  const dropdownValues = [
    { label: "Cash_BINR,ASSET-BND-0001" },
    { label: "Digital_BINR,ASSET-BND-0002" },
    { label: "Digital_USDT,ASSET-BND-0003" },
    { label: "Cash_DINR,ASSET-BND-0004" },
    { label: "Cash_GBP,ASSET-BND-0005" },
    { label: "Cash_INR,ASSET-BND-0006" },
  ];
  return (
    <div className="grid p-fluid">
      <div className="col-12 md:col-12">
        <h5 className="align-self-center text-3xl text-center border-top-1 surface-border pb-3 pt-5">
          Select CBDC Name & Assetid
        </h5>
        <span className="p-float-label ">
          {/* getting the user input for asset name */}
          <Dropdown
            value={data.assetid}
            onChange={(e) => setData({ ...data, assetid: e.target.value })}
            options={dropdownValues}
            optionLabel="label"
            placeholder="Select"
            className="p-2 font-bold text-3xl"
            style={{ height: "4rem", fontSize: "2.0rem" }}
          />
          <label className="text-2xl pl-3" htmlFor="username">
            CBDC Name
          </label>
        </span>

        {/* getting user input for decimal point */}
        <h5 className="align-self-center text-3xl text-center border-top-1 surface-border pb-3 pt-5">
          Select the decimal place: 0.00
        </h5>
        <div className="grid">
          <div className="col-12 md:col-3">
            <div className="field-radiobutton">
              <RadioButton
                inputId="option1"
                name="option"
                value={0}
                checked={data.count === 0}
                onChange={(e) =>
                  setData((data) => {
                    return { ...data, count: e.value };
                  })
                }
              />
              <label className="text-3xl p-4" htmlFor="option1">
                0
              </label>
            </div>
          </div>
          <div className="col-12 md:col-3">
            <div className="field-radiobutton">
              <RadioButton
                inputId="option2"
                name="option"
                value={1}
                checked={data.count === 1}
                onChange={(e) =>
                  setData((data) => {
                    return { ...data, count: e.value };
                  })
                }
              />
              <label className="text-3xl p-4" htmlFor="option2">
                1
              </label>
            </div>
          </div>
          <div className="col-12 md:col-3">
            <div className="field-radiobutton">
              <RadioButton
                inputId="option3"
                name="option"
                value={2}
                checked={data.count === 2}
                onChange={(e) =>
                  setData((data) => {
                    return { ...data, count: e.value };
                  })
                }
              />
              <label className="text-3xl p-4" htmlFor="option3">
                2
              </label>
            </div>
          </div>
          <div className="col-12 md:col-3">
            <div className="field-radiobutton">
              <RadioButton
                inputId="option4"
                name="option"
                value={3}
                checked={data.count === 3}
                onChange={(e) =>
                  setData((data) => {
                    return { ...data, count: e.value };
                  })
                }
              />
              <label className="text-3xl p-4" htmlFor="option4">
                3
              </label>
            </div>
          </div>
        </div>
        <h5 className="align-self-center text-3xl text-center border-top-1 surface-border pb-5 pt-5">
          Enter Maximum value to transfer
        </h5>
        <span className="p-float-label">
          <InputNumber
            id="amount"
            value={data.maxvalue}
            onChange={(e) =>
              setData((data) => {
                return { ...data, maxvalue: e.value };
              })
            }
            showButtons
            mode="decimal"
            style={{ fontSize: "2.4rem", height: "8rem" }}
            className="p-5 m-3  text-3xl"
          ></InputNumber>
          <label className="text-3xl pl-8 pb-3" htmlFor="amount">
            Maximum value
          </label>
        </span>
      </div>
    </div>
  );
};

export default CBName;
