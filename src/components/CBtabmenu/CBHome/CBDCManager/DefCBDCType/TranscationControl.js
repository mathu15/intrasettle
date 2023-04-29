import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
const TransactionControl = ({ data, setData }) => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [skip, setSkip] = useState(data.skip);

  // getting user input for maximum value if the user selects
  // the max value from dialog overlay otherwise skip the step
  const skipper = (
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
        style={{ fontSize: "1.4rem" }}
        className="p-5 m-3"
      ></InputNumber>
      <label className="text-xl pl-8" htmlFor="amount">
        Maximum value
      </label>
    </span>
  );
  const clickHandler = () => {
    setSkip(skipper);
  };

  console.log("data", data);
  return (
    <div className=" flex-column align-items-center">
      <h5 className="text-center text-3xl p-5">
        Configure Transaction Control
      </h5>
      <p className=" text-xl text-center pb-3  border-bottom-1 surface-border surface-overlay ">
        Transaction rules evaluate the entire transaction contracts. for ex, to
        check whether the sum total amounts of all states moved in a transaction
        exceeds a certain value.
      </p>

      <div className="text-center p-5">
        <div className=" p-fluid">
          {/* dialog overlay if add control selected */}
          <Dialog
            header="SELECT RULES TO ADD"
            visible={displayBasic}
            modal
            onHide={() => setDisplayBasic(false)}
          >
            <Card
              style={{ cursor: "pointer", marginBottom: "2rem" }}
              className="transition-colors transition-duration-500 hover:bg-gray-900 "
              onClick={clickHandler}
            >
              {/* select the maxvalue button to add maximum value otherwise skip the step */}
              <div className="flex align-items-center ">
                <Button
                  type="button"
                  // label="Maxvalue"

                  icon="pi pi-plus"
                  style={{
                    // marginTop: "2rem",
                    // marginLeft: "2rem",
                    width: "3rem",
                    borderRadius: "50%",
                    marginRight: "2rem",
                  }}
                />
                {/* <label htmlFor="option1">Maximum Value</label> */}
                <div>
                  <p className="text-3xl border-bottom-1 surface-border p-2">
                    Maximum Value
                  </p>
                  <p className="text-2xl">
                    The Max value sent to any participant cannot exceed the
                    value configured.
                  </p>
                </div>
              </div>
            </Card>
            <Card
              style={{
                cursor: "pointer",
                height: "15rem",
                marginBottom: "2rem",
              }}
              className="transition-colors transition-duration-500   hover:bg-gray-900 "
              onClick={clickHandler}
            >
              <div className="flex align-items-center justify-content-center">
                {/* Maximum Value without Issuer signing otherwise skip*/}
                <Button
                  type="button"
                  // label="Maxvalue"
                  onClick={clickHandler}
                  icon="pi pi-plus"
                  style={{
                    // marginTop: "2rem",
                    // marginLeft: "2rem",
                    width: "3rem",
                    borderRadius: "50%",
                    marginRight: "2rem",
                  }}
                />
                <div>
                  <p className="text-3xl border-bottom-1 surface-border p-2">
                    Maximum Value without Issuer signing
                  </p>
                  <p className="text-2xl">
                    The issuer of a currency must sign any transaction where the
                    value is greater than configured.
                  </p>
                </div>
              </div>
            </Card>
            <Card
              style={{ cursor: "pointer" }}
              className="transition-colors transition-duration-500    hover:bg-gray-900 border-top-2 surface-border"
              onClick={() => setDisplayBasic(false)}
            >
              <div className="flex align-items-center  ">
                <Button
                  type="button"
                  icon="pi pi-minus"
                  style={{
                    marginRight: "2rem",
                    width: "3rem",
                    borderRadius: "50%",
                  }}
                />
                <p className="text-2xl">Close</p>
              </div>
            </Card>
          </Dialog>

          {/* select it to add control */}
          <Button
            type="button"
            label="ADD CONTROL"
            icon="pi text-xl pi-plus"
            onClick={() => setDisplayBasic(true)}
            style={{ width: "20rem", fontSize: "1.4rem" }}
          />
          <p className="text-2xl text-center p-3 ">{skip}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionControl;
