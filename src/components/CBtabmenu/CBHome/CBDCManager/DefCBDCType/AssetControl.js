import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const AssetControl = ({ data, setData }) => {
  //initail state for dialog ovelay set to false
  const [displayBasic, setDisplayBasic] = useState(false);

  return (
    <div className="flex-column align-items-center">
      <h5 className="text-center text-3xl p-5">Configure Asset Control</h5>
      <p className=" text-xl text-center pb-3 border-bottom-1 surface-border surface-overlay ">
        Asset rules look at each individual state in a transaction seperately.
        For ex, to check whether any individual state breached its maximum usage
        controls.
      </p>

      <div className="text-center p-5">
        <div className=" p-fluid">
          {/* dialog overlay if add control selected */}
          <Dialog
            header="SELECT RULES TO ADD"
            visible={displayBasic}
            modal
            onHide={() => setDisplayBasic(false)}
            // className="col-8"
          >
            <Card
              style={{ cursor: "pointer", marginBottom: "2rem" }}
              className="transition-colors transition-duration-500   hover:bg-gray-900 "
              onClick={() => setDisplayBasic(false)}
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
                  <p className="text-2xl border-bottom-1 surface-border p-2">
                    Expiry
                  </p>
                  <p className="text-2xl">
                    This rule ensures the tansactional lifespan of a token does
                    not exceed the configured durarion period. The lifespan is
                    measured
                  </p>
                  <p className="text-2xl">
                    {" "}
                    from the issue date of a oken and he duration is given as an
                    ISO-8601 time interval e.g, 'P2D' specifies a duration of
                    days.
                  </p>
                </div>
              </div>
            </Card>
            <Card
              style={{
                cursor: "pointer",
                height: "10rem",
                marginBottom: "2rem",
              }}
              className="transition-colors transition-duration-500   hover:bg-gray-900 "
              onClick={() => setDisplayBasic(false)}
            >
              <div className="flex align-items-center ">
                {/* Maximum Value without Issuer signing otherwise skip*/}
                <Button
                  type="button"
                  // label="Maxvalue"
                  onClick={() => setDisplayBasic(false)}
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
                  <p className="text-2xl border-bottom-1 surface-border p-2">
                    Maximum Usage Count
                  </p>
                  <p className="text-2xl">
                    This rule ensures that the number of transactions this token
                    can be used in is less than the configured maximum usage
                    count.
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
        </div>
      </div>
    </div>
  );
};

export default AssetControl;
